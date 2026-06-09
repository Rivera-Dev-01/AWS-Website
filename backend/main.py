from fastapi import FastAPI

from routers.members import router as members_router
from routers.events import router as events_router
from routers.sponsors import router as sponsors_router

app = FastAPI(title="AWS Learning Club API")

app.include_router(members_router)
app.include_router(events_router)
app.include_router(sponsors_router)
