"""Lightweight retrieval engine backed by the document_chunks table."""

from __future__ import annotations

from collections import Counter
from math import sqrt
from typing import Any, Iterable

from sqlalchemy.orm import Session

from model.db_models import DocumentChunk


def _tokenize(text: str) -> list[str]:
    """Tokenize text into lowercase alphanumeric tokens.
    
    Args:
        text: Input text
        
    Returns:
        List of tokens
    """
    return [token for token in " ".join(character.lower() if character.isalnum() else " " for character in text).split() if token]


def _vectorize(text: str) -> Counter[str]:
    """Convert text to token frequency counter.
    
    Args:
        text: Input text
        
    Returns:
        Counter with token frequencies
    """
    return Counter(_tokenize(text))


def _cosine_similarity(left: Counter[str], right: Counter[str]) -> float:
    """Calculate cosine similarity between token frequency vectors.
    
    Args:
        left: First token counter
        right: Second token counter
        
    Returns:
        Similarity score between 0.0 and 1.0
    """
    if not left or not right:
        return 0.0
    shared = set(left) & set(right)
    numerator = sum(left[token] * right[token] for token in shared)
    left_norm = sqrt(sum(value * value for value in left.values()))
    right_norm = sqrt(sum(value * value for value in right.values()))
    if left_norm == 0 or right_norm == 0:
        return 0.0
    return numerator / (left_norm * right_norm)


def _chunk_text(text: str, max_size: int = 800) -> list[str]:
    """Split text into fixed-size chunks.
    
    Args:
        text: Input text
        max_size: Maximum chunk size in characters
        
    Returns:
        List of text chunks
    """
    clean_text = text.strip()
    if len(clean_text) <= max_size:
        return [clean_text]
    chunks: list[str] = []
    start = 0
    while start < len(clean_text):
        chunks.append(clean_text[start : start + max_size])
        start += max_size
    return chunks


def ingest_documents(documents: Iterable[dict[str, Any] | str], db: Session, source_name: str | None = None) -> list[DocumentChunk]:
    """Ingest documents into RAG index as chunks.
    
    Args:
        documents: Iterable of document strings or dicts with 'text', 'content', 'source', 'metadata'
        db: Database session
        source_name: Default source name if not in document
        
    Returns:
        List of created DocumentChunk objects
    """
    created_chunks: list[DocumentChunk] = []
    for index, document in enumerate(documents):
        if isinstance(document, str):
            text = document
            metadata: dict[str, Any] = {}
            doc_source = source_name or f"document-{index}"
        else:
            text = str(document.get("text") or document.get("content") or "")
            metadata = dict(document.get("metadata") or {})
            doc_source = str(document.get("source") or source_name or f"document-{index}")

        for chunk_index, chunk_text in enumerate(_chunk_text(text)):
            chunk = DocumentChunk(
                source_name=doc_source,
                chunk_index=chunk_index,
                content=chunk_text,
                metadata_json=metadata,
                embedding=list(_vectorize(chunk_text).values()),
            )
            db.add(chunk)
            created_chunks.append(chunk)

    db.flush()
    return created_chunks


def search_index(query: str, db: Session, top_k: int = 5) -> list[dict[str, Any]]:
    """Search document index by semantic similarity.
    
    Args:
        query: Search query
        db: Database session
        top_k: Number of results to return
        
    Returns:
        List of matching chunks with scores
    """
    query_vector = _vectorize(query)
    chunks = db.query(DocumentChunk).all()
    scored: list[tuple[float, DocumentChunk]] = []
    for chunk in chunks:
        score = _cosine_similarity(query_vector, _vectorize(chunk.content))
        if score > 0:
            scored.append((score, chunk))

    scored.sort(key=lambda item: item[0], reverse=True)
    results: list[dict[str, Any]] = []
    for score, chunk in scored[:top_k]:
        results.append(
            {
                "source": chunk.source_name,
                "chunk_id": chunk.id,
                "score": round(score, 4),
                "text": chunk.content,
                    "metadata": chunk.metadata_json,
            }
        )
    return results


def format_chunks(results: Iterable[dict[str, Any]]) -> str:
    """Format search results as readable text.
    
    Args:
        results: Search result dicts with 'source' and 'text'
        
    Returns:
        Formatted string with source attribution
    """
    formatted: list[str] = []
    for item in results:
        formatted.append(f"[{item.get('source')}] {item.get('text')}")
    return "\n\n".join(formatted)


def run(query: str, db: Session, top_k: int = 5) -> list[dict[str, Any]]:
    """Execute RAG search.
    
    Args:
        query: Search query
        db: Database session
        top_k: Number of results to return
        
    Returns:
        List of matched document chunks
    """
    return search_index(query, db, top_k=top_k)
