# AWS Learning Club - Website

Website for the AWS Learning Club at Mapúa University. Features a mobile-first responsive design with an AI chatbot (Captain Hima) powered by Groq, event listings, department/office spotlights, and more.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Python 3.8+ · FastAPI |
| AI Chat | Groq API (`llama3-8b-8192`) |
| Hosting | Vercel (static + Python serverless) |
| Fonts | Poppins, Montserrat, Lexend, Lexend Deca |

## Project Structure

```
AWS-Website/
├── frontend/
│   ├── pages/                    # HTML pages
│   │   ├── landingPage.html      # Home / landing page
│   │   ├── about.html            # About the club
│   │   ├── events.html           # Events listing
│   │   ├── partners.html         # Partners & sponsors
│   │   ├── achievements.html     # Club achievements
│   │   └── contact.html          # Contact form
│   │
│   ├── components/               # Reusable HTML partials
│   │   ├── header.html           # Navigation bar (loaded dynamically)
│   │   ├── footer.html           # Site footer (loaded dynamically)
│   │   ├── chatbot.html          # Chatbot widget UI
│   │   └── card.html             # Generic card template
│   │
│   ├── css/                      # Per-page + shared stylesheets
│   │   ├── landing-page.css      # Landing page styles
│   │   ├── about.css             # About page styles
│   │   ├── header.css            # Shared header component styles
│   │   ├── footer.css            # Shared footer component styles
│   │   └── chatbot.css           # Chatbot widget styles
│   │
│   ├── js/                       # JavaScript modules
│   │   ├── main.js               # Defines loadComponent() for dynamic loading
│   │   ├── nav.js                # Navigation logic + header/footer loader
│   │   ├── chatbot.js            # Chatbot UI toggle + SSE streaming
│   │   ├── events.js             # Events page card rendering
│   │   ├── future-cards.js       # Future section card rendering
│   │   ├── skill-queue.js        # Skill Builder interactive queue/spotlight
│   │   └── gsap.js               # GSAP cloud animations
│   │
│   └── assets/                   # Organized per-page
│       ├── landing-page/         # Home page assets
│       │   ├── backgrounds/      # Hero, events, sponsors, what-we-do backgrounds
│       │   ├── clouds/           # What-We-Do, What-We-Offer cloud decorations
│       │   ├── icons/            # Department, mission, offices, vision icons
│       │   ├── mascot/           # Hima mascot variations
│       │   └── partners/         # Partner logos (GDG, Bitskwela, etc.)
│       ├── about/                # About page assets
│       │   ├── icons/            # Vision, mission, goal icons
│       │   ├── departments-offices/  # Dept/office logos (PNG + WebP)
│       │   └── clouds/           # Decorative clouds
│       ├── events/               # Events page assets (calendar, etc.)
│       ├── members/              # Members page assets (empty, ready)
│       └── shared/               # Shared across pages
│           ├── components/       # Header/footer/chatbot icons & logos
│           └── mascot/           # Hima_Ship mascot
│
├── backend/                      # FastAPI backend
│   ├── api/
│   │   ├── index.py              # FastAPI app (Vercel entry point)
│   │   ├── chatbot.py            # Groq streaming integration
│   │   ├── config.py             # Environment configuration
│   │   ├── guardrails.py         # Content safety checks
│   │   ├── rate_limiter.py       # IP-based rate limiting (20 req/min)
│   │   ├── cache.py              # In-memory TTL cache (5 min)
│   │   ├── prompts.py            # Captain Hima system prompt
│   │   ├── requirements.txt      # Python dependencies
│   │   └── .env.example          # Env var template
│   └── data/                     # JSON data files (events, partners, etc.)
│
├── vercel.json                   # Vercel deployment config
└── .gitignore
```

## Getting Started

### Prerequisites

- Python 3.8+
- Groq API key (free at https://console.groq.com/)

### 1. Install Backend Dependencies

```bash
pip install -r backend/api/requirements.txt
```

### 2. Set Environment Variables

```bash
cp backend/api/.env.example backend/api/.env
```

Edit `backend/api/.env`:

```
GROQ_API_KEY=gsk_your_key_here
```

### 3. Run Locally

Serve the frontend and API from the same origin using uvicorn:

```bash
uvicorn backend.api.index:app --reload --port 8001 --host 0.0.0.0
```

Open `http://localhost:8001` in your browser.

> **Note:** Opening HTML files directly (`file://`) will fail because `fetch()` for component loading requires an HTTP server.

## Architecture

### Page Loading

Each page loads the header and footer dynamically via `main.js` → `loadComponent()`. The header contains navigation with scroll-driven sub-menus for Departments and Offices.

```js
loadComponent('header-placeholder', '../components/header.html');
loadComponent('footer-placeholder', '../components/footer.html');
```

`nav.js` (deferred) handles the mobile nav toggle, dropdown menus, and populating department/office data from inline JSON arrays.

### CSS Organization

Each page has its own CSS file loaded in `<head>`, plus shared component stylesheets:

| Page | CSS |
|------|-----|
| Landing | `landing-page.css` |
| About | `about.css` |
| All | `header.css`, `footer.css`, `chatbot.css` |

CSS uses a mobile-first approach with `@media (max-width: 768px)` breakpoints for mobile overrides.

### Asset Organization

Assets are stored per-page under `frontend/assets/`:

- `landing-page/` — Backgrounds, clouds, mascots, partner logos
- `about/` — Icons, department/office logos, decorative clouds
- `events/` — Event-specific icons
- `shared/` — Components (header icons, logo) and shared mascots

This keeps each page's assets self-contained and avoids path confusion.

## Chatbot

The **Captain Hima** chatbot ("Chat with Captain Hima") appears as a floating pill button on every page. It uses `llama3-8b-8192` via Groq with SSE streaming responses.

### Architecture

| Layer | File | Purpose |
|-------|------|---------|
| UI | `frontend/components/chatbot.html` | Floating panel markup |
| Styles | `frontend/css/chatbot.css` | Panel, messages, input, trigger styling |
| Client | `frontend/js/chatbot.js` | Toggle, send, SSE stream reader |
| API | `backend/api/index.py` | FastAPI `/api/chat` POST endpoint |
| Engine | `backend/api/chatbot.py` | Groq streaming call |
| Safety | `backend/api/guardrails.py` | Content filtering |
| Rate Limit | `backend/api/rate_limiter.py` | 20 requests/min per IP |
| Cache | `backend/api/cache.py` | 5-min TTL for identical queries |
| Prompt | `backend/api/prompts.py` | Captain Hima persona |

### How It Works

```
User types message
       ↓
Frontend creates empty bot bubble
       ↓
POST /api/chat  { "message": "..." }
       ↓
Backend: rate limit → guardrails → cache check → Groq stream
       ↓
SSE stream: tokens arrive incrementally
       ↓
Frontend appends tokens to bot bubble in real-time
```

### Chatbot UI

- **Trigger**: Pill-shaped button at `bottom: 20px; right: 20px` with chat icon
- **Window**: 380x600px panel at `bottom: 90px; right: 20px; z-index: 9999`
- **Header**: 40px circular avatar with Captain Hima name + green dot + tagline
- **Messages**: Scrollable area with auto-scroll to latest
- **Input**: Rounded text field with send button and character counter (0/1000)
- **Mobile**: Full-width panel at screens ≤480px

## Performance Optimizations

- **WebP images**: All 76 PNGs converted to WebP (85% quality); ~90% bandwidth reduction
- **Lazy loading**: `loading="lazy"` on all offscreen `<img>` tags
- **Deferred scripts**: `defer` on `nav.js` and `chatbot.js` for non-blocking load
- **Per-page CSS**: No unused CSS delivered to pages (each page loads only its own stylesheet)

## Deploying to Vercel

1. Push the repo to GitHub
2. Import in Vercel dashboard
3. Add environment variable: `GROQ_API_KEY` = your Groq API key
4. Deploy — `vercel.json` handles routing:

| Route | Handler |
|-------|---------|
| `/api/*` | Python serverless (FastAPI) |
| `/` | Rewrite to `frontend/pages/landingPage.html` |
| `/*` | Static files from `frontend/` |

The deployed site is at: `https://aws-website-two.vercel.app/`

## Development Notes

- Always serve via HTTP (`localhost:8001` or `localhost:8080`) — `file://` breaks `fetch()`
- Browser cache may cause stale CSS — use `Ctrl+F5` hard refresh
- The chatbot API URL is `/api/chat` (relative) — works in both local and Vercel
- Python imports use absolute paths (`import X`) for Vercel compatibility
- Assets go in per-page folders: `assets/landing-page/`, `assets/about/`, etc.
- Component assets go in `assets/shared/components/`

## Common Tasks

- **Change chatbot persona**: Edit `backend/api/prompts.py`
- **Adjust rate limits**: Edit `backend/api/config.py`
- **Update chatbot styles**: Edit `frontend/css/chatbot.css`
- **Modify streaming behavior**: Edit `frontend/js/chatbot.js`
- **Add events**: Edit `backend/data/events.json` and verify `frontend/js/events.js`
- **Add department/office**: Edit data arrays in `frontend/js/nav.js` and `frontend/js/skill-queue.js`, add icon to `assets/about/departments-offices/`
