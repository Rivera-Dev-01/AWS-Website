# AWS Learning Club Website

Welcome to the AWS Learning Club website project! This is a beginner-friendly web application built with HTML, CSS, JavaScript (frontend) and Python FastAPI (backend).

## 📁 Project Structure

```
AWS-Website/
├── frontend/                 # All frontend files
│   ├── html/                # HTML pages
│   │   ├── components/      # Reusable components (header, footer, card)
│   │   ├── index.html       # Landing page
│   │   ├── about.html       # About page
│   │   ├── events.html      # Events page
│   │   ├── partners.html    # Partners page
│   │   ├── achievements.html # Achievements page
│   │   └── contact.html     # Contact page
│   ├── css/                 # Stylesheets
│   │   └── styles.css       # Main CSS file
│   ├── js/                  # JavaScript files
│   │   ├── main.js          # Template loader
│   │   ├── nav.js           # Navigation component
│   │   ├── contentLoader.js # API content loader
│   │   ├── events.js        # Events page logic
│   │   ├── partners.js      # Partners page logic
│   │   ├── achievements.js  # Achievements page logic
│   │   ├── contactForm.js   # Contact form handler
│   │   └── chatbot.js       # Chatbot interface
│   ├── assets/              # Static assets
│   │   ├── icons/           # Icon files
│   │   ├── logo.png         # Site logo
│   │   └── src/
│   │       └── graphic-designs/ # GSAP animations & Blender renders
│   │       └── mascot/ # AWS Mascot Images for Design
│   ├── favicon.ico          # Browser tab icon
│   └── robots.txt           # Search engine instructions
│
└── backend/                 # All backend files
    ├── data/                # JSON content files
    │   ├── events.json      # Events data
    │   ├── partners.json    # Partners data
    │   ├── achievements.json # Achievements data
    │   └── team.json        # Team members data
    ├── main.py              # FastAPI application
    ├── content_handler.py   # Content file reader
    ├── contact_handler.py   # Contact form handler
    ├── chatbot_engine.py    # Chatbot logic
    └── requirements.txt     # Python dependencies
```

## 🚀 Getting Started

### Prerequisites

Before you start, make sure you have installed:
- **Python 3.8+** - [Download here](https://www.python.org/downloads/)
- **Node.js** (optional, for testing) - [Download here](https://nodejs.org/)

### Installation Steps

1. **Clone or download this repository**
   ```bash
   cd AWS-Website
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Run the backend server**
   ```bash
   python main.py
   ```
   The backend will start at `http://localhost:8000`

4. **Open the frontend**
   - Open `frontend/html/index.html` in your browser
   - Or use a local server (recommended):
     ```bash
     cd frontend
     python -m http.server 3000
     ```
   - Then visit `http://localhost:3000/html/index.html`

## 📝 How to Work on This Project

### For Frontend Developers

**Working on HTML pages:**
1. Open any HTML file in `frontend/html/`
2. Add your content inside the `<main>` tags
3. Save and refresh your browser to see changes

**Working on CSS:**
1. Open `frontend/css/styles.css`
2. Add your styles
3. Save and refresh to see changes

**Working on JavaScript:**
1. Open the relevant JS file in `frontend/js/`
2. Add your functions
3. Save and refresh to test

### For Backend Developers

**Adding content data:**
1. Open JSON files in `backend/data/`
2. Follow the existing format
3. Save the file
4. Restart the backend server

**Working on API endpoints:**
1. Open `backend/main.py`
2. Add or modify endpoints
3. Restart the server to test

## 🎯 Common Tasks

### Adding a New Event
1. Open `backend/data/events.json`
2. Add your event following this format:
   ```json
   {
     "id": "unique-id",
     "title": "Event Name",
     "date": "2024-03-01T18:00:00Z",
     "speaker": {
       "name": "Speaker Name",
       "title": "Speaker Title"
     },
     "description": "Event description",
     "registrationLink": "https://..."
   }
   ```
3. Save and reload the events page

### Updating Styles
1. Open `frontend/css/styles.css`
2. Add your CSS rules
3. Save and refresh browser

### Testing Your Changes
1. Always test in the browser after making changes
2. Check the browser console (F12) for errors
3. Test on mobile view (responsive design)

## 🆘 Getting Help

**Common Issues:**

- **Backend won't start**: Make sure Python is installed and you ran `pip install -r requirements.txt`
- **Changes not showing**: Try hard refresh (Ctrl+F5 or Cmd+Shift+R)
- **API not working**: Check if backend server is running at `http://localhost:8000`


**Happy Coding! 🎉**
