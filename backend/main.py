from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers.members import router as members_router
from routers.events import router as events_router
from routers.sponsors import router as sponsors_router

app = FastAPI(title="AWS Learning Club API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve the actual frontend assets folder at the matching URL path
app.mount("/frontend/assets", StaticFiles(directory="../frontend/assets"), name="frontend-assets")

app.include_router(members_router)
app.include_router(events_router)
app.include_router(sponsors_router)