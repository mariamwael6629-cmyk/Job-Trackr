# JobTrackr

An elegant, AI-powered job application tracker and dashboard with a FastAPI backend and a vanilla HTML/CSS/JS frontend, designed to streamline your job search, optimize resumes, and track your pipeline.

---

## 🚀 Features

* **Authentication:** Email/password registration and login with JWT-based sessions.
* **Unified Dashboard:** Track your application pipeline with status breakdowns (Applied, Reviewing, Interview, Offer, Rejected, Hired).
* **Visual Analytics:** Interactive charts powered by Chart.js to track your application metrics over time.
* **Applications CRUD:** Add, list, and delete applications, all persisted in a database and scoped to your account.
* **Kanban Board:** Drag-and-drop status updates that sync to the backend.
* **AI Tools Hub:** Resume analysis, job match scoring, cover letter generation, interview prep, keyword analysis, and salary negotiation guidance — proxied through the backend so no API key is ever exposed to the browser.
* **Profile & KPIs:** Real account data and computed stats (response rate, interview rate, etc.).

## 🛠️ Tech Stack

* **Backend:** Python, FastAPI, SQLAlchemy, SQLite, JWT (python-jose), Passlib (bcrypt)
* **Frontend:** HTML5, modern CSS3 (Dark-Mode aesthetic, Custom Properties, responsive Grid/Flexbox), vanilla JavaScript
* **Charts:** Chart.js (vendored locally, no CDN dependency)
* **AI:** Anthropic Claude API (optional — falls back to canned responses if no key is configured)

## 📁 Project Structure

```
Job-Trackr/
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI app, CORS, static frontend mount
│   │   ├── config.py          # Settings loaded from .env
│   │   ├── database.py        # SQLAlchemy engine/session
│   │   ├── models.py          # User, Application ORM models
│   │   ├── schemas.py         # Pydantic request/response schemas
│   │   ├── security.py        # Password hashing + JWT helpers
│   │   ├── deps.py            # get_current_user dependency
│   │   ├── seed.py            # Demo user + demo applications seeding
│   │   ├── routers/
│   │   │   ├── auth.py        # /api/auth/* endpoints
│   │   │   ├── applications.py# /api/applications/* endpoints
│   │   │   └── ai.py          # /api/ai/* endpoint
│   │   └── services/
│   │       └── ai_service.py  # Claude API call + fallback text
│   ├── requirements.txt
│   ├── .env.example           # Copy to .env and fill in
│   └── .gitignore
└── frontend/
    ├── index.html             # The full app (markup, styles, JS)
    └── vendor/
        └── chart.umd.js       # Chart.js, vendored locally
```

## 💻 Getting Started

### 1. Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env             # then edit .env — at minimum set JWT_SECRET_KEY
```

Generate a secret key for `JWT_SECRET_KEY` with:

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

`ANTHROPIC_API_KEY` is optional — leave it blank to use the built-in fallback responses for the AI Tools page.

### 2. Run the app

```bash
cd backend
uvicorn app.main:app --reload
```

This starts the API **and** serves the frontend from the same origin at **http://localhost:8000/** (no separate frontend server or CORS setup needed). The database (`backend/jobtrackr.db`, SQLite) is created automatically on first run and seeded with a demo account:

* **Email:** `ahmed.hassan@email.com`
* **Password:** `password123`

Interactive API docs are available at **http://localhost:8000/docs** (Swagger UI) and **http://localhost:8000/redoc**.

### Running the frontend separately (optional)

If you prefer to serve `frontend/index.html` with a separate static server (e.g. VS Code Live Server), the backend's CORS settings already allow this — just update `CORS_ORIGINS` in `backend/.env` to include the frontend's origin, and edit `API_BASE` near the top of the `<script>` block in `frontend/index.html` to point at the backend's URL.

## 📖 How It Works

* **Auth:** The frontend is gated behind a login/register overlay. A JWT is stored in `localStorage` and sent as a `Bearer` token on every API call; it persists across reloads until logout.
* **Data:** All applications, statuses, and profile info are real data fetched from and written to the backend — nothing is hardcoded.
* **AI Tools:** Each tool calls `/api/ai/run/{tool}` on the backend, which calls the Claude API server-side (keeping the API key private) and gracefully falls back to pre-written sample output if no key is configured or the call fails.
