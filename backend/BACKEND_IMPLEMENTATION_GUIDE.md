# ADIA Backend Implementation Guide & Frontend Integration

This guide provides a detailed, file-by-file breakdown of the ADIA backend. It ensures complete alignment with the frontend requirements identified in the React components, explaining what code belongs in each file, how the system is set up, and the data flow from input to output.

---

## 1. Frontend-Backend Contract Mapping

Based on the frontend code structure, the backend must support the following features. This dictates the API routes we need:

| Frontend Component | Required Backend Endpoints | Purpose |
|-------------------|----------------------------|---------|
| `login_signup.jsx`| `POST /api/auth/login`, `POST /api/auth/signup` | JWT-based user authentication. |
| `dashboard.jsx`   | `GET /api/projects`, `GET /api/metrics/global` | Fetch active projects, global stats (Uptime, Queries). |
| `querry.jsx`      | `POST /api/query` | Natural language interface. Takes query, routes to Agent. |
| `history.jsx`     | `GET /api/history` | Returns audit trail of past queries, origins, and status. |
| `analytics.jsx`   | `GET /api/analytics/telemetry` | Returns data for charts (throughput trends, source mix). |
| `notifications.jsx`| `GET /api/notifications/logs`, `POST /api/notifications/rules` | Fetch delivery logs and configure alert thresholds. |
| `sidebar.jsx`     | `GET /api/system/health` | Agent status indicator (Live & Synchronized). |

---

## 2. Detailed File-by-File Breakdown

### Root Configuration
* **`requirements.txt`**: Contains Python dependencies: `fastapi, uvicorn, langchain, openai, pandas, scipy, matplotlib, sentence-transformers, faiss-cpu, pyjwt, sqlalchemy, pydantic`.
* **`main.py`**: The entry point. Initializes the FastAPI app, configures CORS middleware to allow the React frontend to connect, and includes all routers from the `controller/` directory.
* **`config.py`**: Loads environment variables using `pydantic-settings`. Stores `OPENAI_API_KEY`, `JWT_SECRET`, database URIs, and logging levels.

### Controllers (API Routing)
* **`controller/auth_router.py`**: Endpoints for `/login` and `/signup`. Handles password hashing and returns JWT tokens.
* **`controller/project_router.py`**: Endpoints to list and manage workspaces.
* **`controller/query_router.py`**: Exposes `POST /query`. Receives the user's prompt, passes it to the `Agent Orchestrator`, and returns the final synthesized response and visualization URLs.
* **`controller/history_router.py`**: Queries the SQLite tracking DB to fetch logs of past user queries.
* **`controller/analytics_router.py`**: Aggregates system metrics (latency, source mix percentages) for the telemetry dashboard.
* **`controller/notification_router.py`**: Manages the CRUD operations for active automations/thresholds and returns recent dispatch logs.

### Agent Logic (The Brain)
* **`agent/orchestrator.py`**: The core LLM loop using LangChain's ReAct implementation. It takes the user's query, initializes the tools, and runs the `AgentExecutor`. This file holds the logic that decides *which* tool to use.
* **`agent/prompts.py`**: Contains the system prompts. For example, "You are ADIA, a deterministic data agent. Never guess numbers. Always use tools to fetch data..."
* **`agent/memory.py`**: Manages conversational context. Uses LangChain's `ConversationBufferWindowMemory` to store the last 10 messages of a session.

### Tools (Execution Engines)
* **`tools/sql_engine.py`**: Takes a natural language query, generates SQL, validates that it starts with `SELECT`, connects to SQLite via SQLAlchemy, and executes it. Returns stringified JSON rows.
* **`tools/insight_engine.py`**: A tool that takes data arrays and uses `pandas` and `scipy` to calculate deltas (e.g., period-over-period) and identify Z-score anomalies.
* **`tools/action_engine.py`**: A tool the agent can call to set up a background rule. It saves thresholds (e.g., "Alert if revenue < 50k") into the database.
* **`tools/viz_engine.py`**: A tool that accepts data and a chart type. Uses `matplotlib` to render an image, saves it to a `/public` or `/static` folder, and returns the URL.
* **`tools/rag_engine.py`**: Connects to `FAISS` and `sentence-transformers`. Takes a search string, embeds it, performs a similarity search against ingested documents, and returns the top 3 chunks of text.

### Models (Data Structures)
* **`model/schemas.py`**: Pydantic models for request/response validation. E.g., `QueryRequest(query: str, sources: list)`, `LoginRequest`, `AgentResponse`.
* **`model/db_models.py`**: SQLAlchemy ORM models defining the database schema. Tables for `Users`, `Projects`, `QueryLogs`, and `AlertRules`.

### Utilities
* **`utils/db.py`**: SQLAlchemy engine initialization and session management (the `get_db` dependency used in FastAPI).
* **`utils/auth.py`**: Helper functions for JWT encoding/decoding and password hashing (bcrypt).
* **`utils/logger.py`**: Custom structured logging setup so terminal outputs look like the frontend's console animations.

---

## 3. Setup and Execution Flow

### How the Backend is Set Up
1. **Virtual Environment**: Python 3.11+ is used. A `.venv` is created and packages are installed via `pip install -r requirements.txt`.
2. **Database Migration**: SQLAlchemy creates the local SQLite file (`metadata.db`) to store users, logs, and alerts.
3. **Running the Server**: Started via `uvicorn main:app --reload --port 8000`.

### Data Flow: How Output is Ultimately Provided
Let's trace a user typing *"Show me the monthly revenue growth for 2024"* in `querry.jsx`.

1. **Request**: The React frontend sends a `POST` request to `http://localhost:8000/api/query` with a JWT token.
2. **Validation (Controller)**: `query_router.py` receives it. `auth.py` validates the user. 
3. **Orchestration (Agent)**: The query is passed to `orchestrator.py`. The Orchestrator injects the user's query and their recent chat history into the LLM prompt.
4. **Planning (LLM)**: The LLM outputs: *Thought: I need to query the database for 2024 revenue.* Action: `sql_engine`. Action Input: "Sum revenue group by month for 2024".
5. **Execution (Tool)**: `sql_engine.py` translates this to `SELECT SUM(amount), strftime('%m', date) ...`, executes it, and returns `[{"month": "01", "revenue": 100000}, ...]`.
6. **Further Planning (LLM)**: The LLM receives the data. *Thought: I should visualize this.* Action: `viz_engine`. Action Input: `{"data": [...], "type": "bar"}`.
7. **Visualization (Tool)**: `viz_engine.py` draws the chart, saves it to disk, and returns the URL `/static/charts/rev2024.png`.
8. **Synthesis (LLM)**: The LLM generates the final human-readable text.
9. **Logging**: `history_router.py` logic saves the query, execution time, and sources to the SQLite DB.
10. **Response**: FastAPI returns a JSON object containing the text, the visualization URL, and the execution trace.
11. **Frontend Update**: React state updates, displaying the agent's message and the chart.
