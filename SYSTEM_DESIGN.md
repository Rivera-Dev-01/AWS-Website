# System Design Document - AWS Learning Club Website

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Data Flow](#data-flow)
4. [Component Design](#component-design)
5. [API Design](#api-design)
6. [Frontend Architecture](#frontend-architecture)
7. [Backend Architecture](#backend-architecture)
8. [Design Decisions](#design-decisions)
9. [Scalability Considerations](#scalability-considerations)
10. [Team Presentation Guide](#team-presentation-guide)

---

## Overview

### What is System Design?
System design is the process of defining the architecture, components, modules, interfaces, and data flow of a system to satisfy specified requirements. Think of it as creating a blueprint before building a house.

### Our System
The AWS Learning Club website is a **client-server web application** with:
- **Frontend**: What users see and interact with (HTML/CSS/JavaScript)
- **Backend**: The server that provides data and handles logic (Python FastAPI)
- **Data Layer**: JSON files storing content (events, partners, achievements, team)

### Key Design Principle
**Separation of Concerns** - Each part of the system has a specific job:
- Frontend: Display and user interaction
- Backend: Data management and business logic
- Data: Content storage

---

## Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   HTML     │  │    CSS     │  │ JavaScript │            │
│  │  (Pages)   │  │  (Styles)  │  │  (Logic)   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP Requests
                            │ (GET /api/events, POST /api/contact)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER (FastAPI)                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │    API     │  │  Content   │  │  Contact   │            │
│  │ Endpoints  │  │  Handler   │  │  Handler   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ File Read/Write
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER (JSON Files)                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ events.json│  │partners.json│ │achievements│            │
│  │ team.json  │  │            │  │   .json    │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Type: **Three-Tier Architecture**

1. **Presentation Tier** (Frontend)
   - User interface
   - Runs in the browser
   - Technologies: HTML, CSS, JavaScript

2. **Application Tier** (Backend)
   - Business logic
   - API endpoints
   - Runs on server
   - Technology: Python FastAPI

3. **Data Tier** (Data Storage)
   - Content storage
   - JSON files
   - File system

---

## Data Flow

### Example: User Views Events Page

```
1. USER ACTION
   User clicks "Events" in navigation
   ↓

2. BROWSER REQUEST
   Browser loads events.html
   JavaScript executes: main.js, events.js
   ↓

3. TEMPLATE LOADING
   main.js fetches header.html and footer.html
   Injects them into the page
   ↓

4. API REQUEST
   events.js calls: GET http://localhost:8000/api/events
   ↓

5. BACKEND PROCESSING
   FastAPI receives request
   → Calls content_handler.py
   → Reads backend/data/events.json
   → Parses JSON data
   → Returns JSON response
   ↓

6. FRONTEND RENDERING
   events.js receives JSON data
   → Filters events (upcoming vs past)
   → Loads card.html template
   → Populates cards with event data
   → Displays on page
   ↓

7. USER SEES
   Fully rendered events page with data
```

### Example: User Submits Contact Form

```
1. USER ACTION
   User fills form and clicks "Submit"
   ↓

2. CLIENT-SIDE VALIDATION
   contactForm.js validates:
   - Name (min 2 characters)
   - Email (valid format)
   - Message (min 10 characters)
   ↓

3. API REQUEST
   POST http://localhost:8000/api/contact
   Body: { name, email, message }
   ↓

4. BACKEND PROCESSING
   FastAPI receives request
   → Validates data with Pydantic models
   → Calls contact_handler.py
   → Sends email via SMTP/AWS SES
   → Returns success/error response
   ↓

5. FRONTEND FEEDBACK
   contactForm.js receives response
   → Displays confirmation message (success)
   → OR displays error message (failure)
   ↓

6. USER SEES
   Confirmation or error message
```

---

## Component Design

### Frontend Components

#### 1. Template Loader (main.js)
**Purpose**: Load reusable HTML templates dynamically

**Why?**
- Avoid code duplication (header/footer on every page)
- Easy to update (change header once, updates everywhere)
- Cleaner code organization

**How it works:**
```javascript
// Fetches template file
fetch('components/header.html')
  .then(response => response.text())
  .then(html => {
    // Injects into page
    document.getElementById('header-placeholder').innerHTML = html;
  });
```

#### 2. Content Loader (contentLoader.js)
**Purpose**: Fetch data from backend API

**Why?**
- Centralized API communication
- Consistent error handling
- Caching to reduce API calls

**How it works:**
```javascript
async function loadContent(contentType) {
  // Maps content type to API endpoint
  const endpoints = {
    'events': '/api/events',
    'partners': '/api/partners'
  };
  
  // Fetches from backend
  const response = await fetch(endpoints[contentType]);
  const data = await response.json();
  return data;
}
```

#### 3. Page-Specific Components
- **events.js**: Renders event cards, filters by date
- **partners.js**: Renders partner cards
- **achievements.js**: Renders achievement cards, categorizes by type
- **contactForm.js**: Handles form submission, validation
- **chatbot.js**: Manages chatbot interface, sends questions to backend

#### 4. Reusable Templates
- **header.html**: Logo + navigation menu
- **footer.html**: Contact info + social links
- **card.html**: Generic card layout for events/partners/achievements

### Backend Components

#### 1. FastAPI Application (main.py)
**Purpose**: Main server application, defines API endpoints

**Responsibilities:**
- Route HTTP requests to correct handlers
- Validate request data
- Return JSON responses
- Handle CORS (Cross-Origin Resource Sharing)

#### 2. Content Handler (content_handler.py)
**Purpose**: Read and parse JSON content files

**Responsibilities:**
- Read JSON files from data/ directory
- Parse JSON into Python objects
- Validate data structure
- Handle file read errors

#### 3. Contact Handler (contact_handler.py)
**Purpose**: Process contact form submissions

**Responsibilities:**
- Validate form data
- Send emails via SMTP or AWS SES
- Log submissions
- Handle email service failures

#### 4. Chatbot Engine (chatbot_engine.py)
**Purpose**: Process user questions with rule-based logic

**Responsibilities:**
- Match user input to intents (events, membership, learning paths)
- Generate appropriate responses
- Provide fallback for unrecognized questions
- Sanitize input to prevent attacks

---

## API Design

### RESTful API Principles

**REST** = Representational State Transfer

**Key Principles:**
1. **Stateless**: Each request contains all information needed
2. **Resource-based**: URLs represent resources (events, partners)
3. **HTTP Methods**: GET (read), POST (create), PUT (update), DELETE (remove)
4. **JSON Format**: Data exchanged in JSON format

### API Endpoints

#### GET /api/events
**Purpose**: Retrieve all events

**Request:**
```http
GET http://localhost:8000/api/events
```

**Response:**
```json
{
  "lastUpdated": "2024-03-01T10:00:00Z",
  "data": [
    {
      "id": "evt-001",
      "title": "AWS Workshop: EC2 Basics",
      "date": "2024-04-15T18:00:00Z",
      "speaker": {
        "name": "John Doe",
        "title": "AWS Solutions Architect"
      },
      "description": "Learn EC2 fundamentals",
      "registrationLink": "https://...",
      "status": "upcoming"
    }
  ]
}
```

#### GET /api/partners
**Purpose**: Retrieve all partners

#### GET /api/achievements
**Purpose**: Retrieve all achievements

#### GET /api/team
**Purpose**: Retrieve team members

#### POST /api/contact
**Purpose**: Submit contact form

**Request:**
```http
POST http://localhost:8000/api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "I'd like to join the club"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Your inquiry has been submitted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to send email. Please try again."
}
```

#### POST /api/chatbot
**Purpose**: Process chatbot questions

**Request:**
```http
POST http://localhost:8000/api/chatbot
Content-Type: application/json

{
  "question": "When is the next event?"
}
```

**Response:**
```json
{
  "response": "Our next event is the AWS Workshop on April 15th. Check the Events page for details!",
  "intent": "events"
}
```

### API Design Decisions

**Why JSON?**
- Lightweight and easy to parse
- Native JavaScript support
- Human-readable
- Industry standard

**Why RESTful?**
- Simple and intuitive
- Stateless (easier to scale)
- Cacheable responses
- Well-documented standard

**Why separate endpoints?**
- Clear separation of concerns
- Easier to maintain
- Can add authentication per endpoint
- Better error handling

---

## Frontend Architecture

### File Organization

```
frontend/
├── html/
│   ├── components/       # Reusable templates
│   │   ├── header.html
│   │   ├── footer.html
│   │   └── card.html
│   ├── index.html        # Landing page
│   ├── about.html
│   ├── events.html
│   ├── partners.html
│   ├── achievements.html
│   └── contact.html
├── css/
│   └── styles.css        # All styles in one file
├── js/
│   ├── main.js           # Template loader (loads first)
│   ├── nav.js            # Navigation logic
│   ├── contentLoader.js  # API communication
│   ├── events.js         # Events page logic
│   ├── partners.js
│   ├── achievements.js
│   ├── contactForm.js
│   └── chatbot.js
└── assets/
    ├── icons/
    ├── mascot/
    ├── logo.png
    └── src/graphic-designs/
```

### Page Load Sequence

```
1. Browser loads HTML file (e.g., events.html)
   ↓
2. HTML references CSS (styles.css loads)
   ↓
3. HTML references JavaScript modules
   ↓
4. main.js executes first
   - Loads header.html template
   - Loads footer.html template
   - Initializes navigation
   ↓
5. Page-specific JS executes (e.g., events.js)
   - Calls contentLoader.js
   - Fetches data from backend API
   - Renders content dynamically
   ↓
6. Page fully rendered and interactive
```

### Design Pattern: Module Pattern

Each JavaScript file is a module with specific responsibilities:

```javascript
// events.js - Module for events page
export function renderUpcomingEvents(events) {
  // Logic here
}

export function renderPastEvents(events) {
  // Logic here
}

// Other files import and use these functions
import { renderUpcomingEvents } from './events.js';
```

**Benefits:**
- Code organization
- Reusability
- Easier testing
- Avoid naming conflicts

---

## Backend Architecture

### File Organization

```
backend/
├── data/                 # JSON content files
│   ├── events.json
│   ├── partners.json
│   ├── achievements.json
│   └── team.json
├── main.py              # FastAPI app + endpoints
├── content_handler.py   # Reads JSON files
├── contact_handler.py   # Email handling
├── chatbot_engine.py    # Chatbot logic
└── requirements.txt     # Python dependencies
```

### Request Handling Flow

```
HTTP Request
   ↓
FastAPI Router (main.py)
   ↓
Endpoint Function
   ↓
Handler Module (content_handler, contact_handler, chatbot_engine)
   ↓
Data Layer (JSON files or external service)
   ↓
Response Processing
   ↓
JSON Response to Frontend
```

### Design Pattern: Handler Pattern

Each handler has a specific responsibility:

```python
# content_handler.py
def get_events():
    """Reads and returns events from JSON file"""
    data = read_content_file('events.json')
    return data

# contact_handler.py
def send_contact_email(name, email, message):
    """Sends email via SMTP"""
    # Email logic here
    return success_status

# chatbot_engine.py
def process_question(question):
    """Processes user question and returns response"""
    intent = match_intent(question)
    response = get_response(intent)
    return response
```

**Benefits:**
- Single Responsibility Principle
- Easy to test individual handlers
- Easy to swap implementations (e.g., change email service)
- Clear code organization

---

## Design Decisions

### 1. Why Static Frontend + API Backend?

**Decision**: Separate static HTML/CSS/JS frontend that calls backend API

**Alternatives Considered:**
- Server-side rendering (Flask templates, Django templates)
- Single-page application framework (React, Vue)

**Why We Chose This:**
- ✅ Simpler for beginners
- ✅ Clear separation of concerns
- ✅ Frontend can be hosted on CDN (faster, cheaper)
- ✅ Backend can scale independently
- ✅ No build process needed
- ✅ Easy to understand data flow

### 2. Why JSON Files Instead of Database?

**Decision**: Store content in JSON files

**Alternatives Considered:**
- SQL database (PostgreSQL, MySQL)
- NoSQL database (MongoDB)
- CMS (WordPress, Strapi)

**Why We Chose This:**
- ✅ No database setup required
- ✅ Easy to edit (just open JSON file)
- ✅ Version control friendly (Git tracks changes)
- ✅ Sufficient for small content volume
- ✅ No database hosting costs
- ✅ Easy backup (just copy files)

**When to Switch to Database:**
- Content grows beyond 1000 items
- Need complex queries
- Multiple users editing simultaneously
- Need user authentication/authorization

### 3. Why FastAPI Instead of Flask/Django?

**Decision**: Use FastAPI for backend

**Alternatives Considered:**
- Flask (simpler, more established)
- Django (full-featured, includes ORM)
- Express.js (Node.js)

**Why We Chose FastAPI:**
- ✅ Automatic API documentation (Swagger UI)
- ✅ Built-in data validation (Pydantic)
- ✅ Modern Python (async support)
- ✅ Fast performance
- ✅ Easy to learn
- ✅ Great for APIs (our use case)

### 4. Why Reusable Templates?

**Decision**: Use header.html, footer.html, card.html templates

**Alternative:**
- Copy-paste header/footer on every page

**Why We Chose Templates:**
- ✅ DRY principle (Don't Repeat Yourself)
- ✅ Update once, changes everywhere
- ✅ Easier maintenance
- ✅ Consistent UI across pages
- ✅ Smaller file sizes

### 5. Why Monorepo?

**Decision**: Frontend and backend in same repository

**Alternative:**
- Separate repositories for frontend and backend

**Why We Chose Monorepo:**
- ✅ Easier for small team
- ✅ Single source of truth
- ✅ Simpler version control
- ✅ Easier to coordinate changes
- ✅ Simpler CI/CD setup

---

## Scalability Considerations

### Current Scale
- **Users**: 100-1000 concurrent users
- **Content**: ~50 events, ~10 partners, ~20 achievements
- **Traffic**: Low to moderate

### Scaling Strategy

#### Phase 1: Current (MVP)
```
[Users] → [Static Files] → [FastAPI Server] → [JSON Files]
```
- Single server
- JSON file storage
- Good for: 0-1000 users

#### Phase 2: Add Caching
```
[Users] → [CDN] → [Static Files]
           ↓
[Users] → [FastAPI Server] → [Redis Cache] → [JSON Files]
```
- CDN for static files (CloudFront)
- Redis for API response caching
- Good for: 1000-10,000 users

#### Phase 3: Database + Load Balancer
```
[Users] → [CDN] → [Static Files]
           ↓
[Users] → [Load Balancer] → [FastAPI Server 1]
                          → [FastAPI Server 2] → [PostgreSQL Database]
                          → [FastAPI Server 3]
```
- Multiple backend servers
- Load balancer distributes traffic
- PostgreSQL for data storage
- Good for: 10,000+ users

### Performance Optimizations

**Frontend:**
- Minify CSS/JS files
- Optimize images (WebP format)
- Lazy loading for images
- Browser caching
- CDN for static assets

**Backend:**
- Response caching (Redis)
- Database indexing (when we add DB)
- Async request handling
- Connection pooling
- Rate limiting

**Infrastructure:**
- Use AWS Lambda for serverless backend
- CloudFront CDN for frontend
- S3 for static file hosting
- Auto-scaling groups

---

## Team Presentation Guide

### How to Explain This to Your Team

#### 1. Start with the Big Picture

**Analogy**: Restaurant System
- **Frontend** = Menu and dining area (what customers see)
- **Backend** = Kitchen (where food is prepared)
- **Data** = Pantry (where ingredients are stored)
- **API** = Waiter (takes orders from customers to kitchen)

#### 2. Show the Data Flow

Use the events page example:
1. User clicks "Events"
2. Browser loads events.html
3. JavaScript asks backend: "Give me events"
4. Backend reads events.json
5. Backend sends events to frontend
6. JavaScript displays events on page

#### 3. Explain Why We Made These Choices

**Why separate frontend and backend?**
- Frontend team can work independently
- Backend team can work independently
- Easier to fix bugs (know which side has the problem)
- Can update one without touching the other

**Why JSON files?**
- Easy to understand (just text files)
- Easy to edit (no database knowledge needed)
- Easy to backup (just copy files)
- Good enough for our needs

**Why templates?**
- Write header once, use everywhere
- Change logo? Update one file, done!
- Consistent look across all pages

#### 4. Show Them the Code Structure

Walk through the file tree:
- "This is where HTML pages live"
- "This is where we style things"
- "This is where we add interactivity"
- "This is where the backend lives"
- "This is where content is stored"

#### 5. Demonstrate a Simple Change

**Example**: Add a new event
1. Open `backend/data/events.json`
2. Add new event object
3. Save file
4. Refresh events page
5. New event appears!

**Point**: Show how easy it is to work with the system

#### 6. Explain Their Roles

**Frontend Developers:**
- Work in `frontend/` folder
- Edit HTML, CSS, JavaScript
- Make things look good and work smoothly
- Don't need to touch backend

**Backend Developers:**
- Work in `backend/` folder
- Edit Python files
- Handle data and logic
- Don't need to touch frontend

**Content Managers:**
- Edit JSON files in `backend/data/`
- Add/update events, partners, achievements
- Don't need to code

#### 7. Address Common Questions

**Q: Why not use WordPress?**
A: We want to learn how web apps work from scratch. WordPress hides the details.

**Q: Why not use React?**
A: React is great but adds complexity. We're keeping it simple to focus on fundamentals.

**Q: What if JSON files get too big?**
A: We'll migrate to a database when needed. For now, JSON is perfect.

**Q: How do we deploy this?**
A: Frontend → AWS S3 + CloudFront, Backend → AWS Lambda or EC2

### Visual Aids for Presentation

#### Diagram 1: System Overview
```
┌─────────┐      ┌─────────┐      ┌─────────┐
│ Browser │ ───> │ Backend │ ───> │  JSON   │
│  (HTML/ │ <─── │ (FastAPI│ <─── │  Files  │
│  CSS/JS)│      │  Python)│      │         │
└─────────┘      └─────────┘      └─────────┘
```

#### Diagram 2: Request Flow
```
User Action → Browser → API Request → Backend → JSON File
                ↑                                    ↓
                └──────── JSON Response ─────────────┘
```

#### Diagram 3: File Organization
```
AWS-Website/
├── frontend/  ← What users see
└── backend/   ← What powers the site
```

### Key Talking Points

1. **Separation of Concerns**: Each part has one job
2. **Scalability**: Can grow as we add features
3. **Maintainability**: Easy to find and fix bugs
4. **Team-Friendly**: Multiple people can work simultaneously
5. **Learning-Focused**: Understand how web apps work

### Demo Script

1. **Show the website** - Navigate through pages
2. **Show the code** - Open a few files, explain briefly
3. **Make a change** - Add an event, show it appear
4. **Show the API** - Open browser dev tools, show network requests
5. **Explain the flow** - Walk through what happens when user clicks

---

## Conclusion

This system design provides:
- ✅ Clear architecture
- ✅ Separation of concerns
- ✅ Scalability path
- ✅ Easy maintenance
- ✅ Team-friendly structure
- ✅ Learning opportunities

The design is intentionally simple to allow your beginner team to understand and contribute effectively while following industry best practices.

---

**Questions to Ask Your Team:**
1. Does the architecture make sense?
2. Which part would you like to work on?
3. Any concerns about the design?
4. What would you change?

**Next Steps:**
1. Review this document with the team
2. Assign roles (frontend, backend, content)
3. Set up development environment
4. Start with simple tasks from tasks.md
5. Regular check-ins to address questions

Good luck with your presentation! 🚀
