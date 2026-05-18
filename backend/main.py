from fastapi import FastAPI

app = FastAPI(
    title="DashPilot AI API",
    description="Backend API for AI-powered dashboard generation",
    version="0.1.0"
)


@app.get("/")
def home():
    return {
        "message": "DashPilot AI backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "dashpilot-ai-backend"
    }