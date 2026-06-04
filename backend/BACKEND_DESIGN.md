# ADIA Backend Architecture & Implementation Design

Based on the technical design document (`explanation.tex`) and the frontend's capabilities, this document outlines the detailed backend architecture for the Autonomous Data Intelligence Agent (ADIA).

## 1. System Architecture Layers

The backend uses a 5-layer architecture ensuring that the LLM solely acts as a planner, while deterministic tools handle execution.

### 1.1 API Layer (FastAPI)
Acts as the entry point for the frontend, handling stateless REST requests, validating inputs via Pydantic, and managing session routing.

### 1.2 Agent Layer (LangChain Orchestrator)
Implements the **ReAct (Reasoning + Acting)** pattern. It evaluates user intents and maps them to an execution plan. It loops through `Thought -> Action -> Observation` until it determines a final response.

### 1.3 Tool Layer (Execution Engines)
- **SQL Execution Engine**: Translates natural language to SQL, validates for read-only (`SELECT`), and executes against SQLite.
- **Insight Engine**: Uses `pandas` and `scipy` for statistical analysis, anomalies (Z-scores), and period-over-period delta calculation.
- **Action Engine**: Evaluates defined conditional thresholds and triggers alerts (logs, system alerts).
- **Visualization Engine**: Selects chart types and renders Matplotlib images based on query results.
- **RAG Retriever**: Chunks text, generates embeddings (using `sentence-transformers`), and fetches context via FAISS.

### 1.4 Memory & Context Layer
- **Conversational Memory**: Stores the last $N=10$ interaction turns mapped by a `session_id`. Triggers summary compression if context gets too long.
- **Vector Index**: FAISS for persistent storage of document embeddings.

### 1.5 Database Layer
- **SQLite**: Stores business data queried by the SQL engine.
- **Document Store**: Raw text and metadata for RAG.

---

## 2. Directory Structure

To align with the existing scaffolding, the `backend` directory should be organized as follows:

```text
backend/
├── main.py                  # FastAPI application entry point
├── config.py                # Environment variables and configuration
├── requirements.txt         # Python dependencies
├── controller/
│   ├── query_router.py      # Handles /query endpoints
│   ├── action_router.py     # Handles /action endpoints
│   └── history_router.py    # Handles /history endpoints
├── agent/
│   ├── orchestrator.py      # Core ReAct loop and LLM initialization
│   ├── prompts.py           # System prompts for different intents
│   └── memory.py            # Session management and context windowing
├── tools/
│   ├── sql_engine.py        # Safe SQLite execution wrapper
│   ├── insight_engine.py    # Pandas/Scipy anomaly detection
│   ├── action_engine.py     # Rule evaluation and alerting
│   ├── viz_engine.py        # Matplotlib generation
│   └── rag_engine.py        # FAISS search and ingestion
├── model/
│   ├── schemas.py           # Pydantic models (Request/Response)
│   └── db_models.py         # SQLAlchemy models (if extending SQLite tracking)
└── utils/
    ├── db.py                # Database connection utilities
    └── logger.py            # System logging configuration
```

---

## 3. API Endpoints Contract

### 3.1 `POST /api/v1/query`
The primary endpoint interacting with the `QueryPage` on the frontend.
- **Request**: `{ "session_id": "uuid", "query": "Why did conversion drop in March?", "sources": ["SQL", "RAG"] }`
- **Response**: 
```json
{
  "status": "success",
  "data": {
    "answer": "Revenue fell 6.2% in March vs February. Primary cause: Electronics dropped 24.2%.",
    "viz_url": "/static/charts/xyz.png",
    "execution_trace": [
      "SQL execution: conversion_metrics",
      "Insight extraction: anomaly_detect"
    ]
  }
}
```

### 3.2 `GET /api/v1/history/{session_id}`
Supports the `HistoryPage` displaying past queries.
- **Response**: Array of previous turns including `query`, `response`, `timestamp`, and `tools_used`.

### 3.3 `POST /api/v1/action`
Supports the `NotificationsPage` for creating data alerts.
- **Request**: `{ "metric": "monthly_revenue", "operator": "<", "threshold": 50000, "action": "email" }`

### 3.4 `GET /api/v1/analytics/telemetry`
Supports the `AnalyticsPage` metrics (Uptime, Queries, Latency).

---

## 4. Execution Flow Diagram

1. **Client** calls `POST /query`.
2. **Controller** validates payload and fetches session memory.
3. **Agent Orchestrator** receives the query and injects the DB Schema + History into the LLM context.
4. **LLM** classifies the intent and generates a plan (e.g., call `sql_engine`, then `insight_engine`).
5. **Tool Loop**: Tools execute sequentially. Error loops allow the LLM to auto-correct bad SQL up to 2 times.
6. **Synthesis**: LLM takes all `Observations` and crafts a final human-readable `Answer`.
7. **Controller** saves the state to Memory and returns the JSON payload.

---

## 5. Next Implementation Steps

1. **Setup Dependencies**: Create `requirements.txt` with `fastapi, uvicorn, langchain, pandas, scipy, matplotlib, sentence-transformers, faiss-cpu`.
2. **Build Tool Stubs**: Implement the base Python classes in the `tools/` directory ensuring they all share a common `run(args)` interface.
3. **Database Connectivity**: Finalize `utils/db.py` to securely connect to a sample SQLite database.
4. **Agent Orchestration**: Wire up LangChain with a local or API-based LLM (e.g., OpenAI or local Llama) utilizing the `create_react_agent` function.
5. **FastAPI Wiring**: Bind the controllers to the orchestrator and serve the API.
