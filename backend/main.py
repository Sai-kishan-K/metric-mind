from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import BytesIO

from services.profiler import profile_dataframe
from services.chart_recommender import recommend_charts
from services.chart_data import generate_chart_payloads
from typing import Optional

latest_dataframe = None


class CustomChartRequest(BaseModel):
    chart_type: str
    x: Optional[str] = None
    y: Optional[str] = None
    aggregation: Optional[str] = None   

app = FastAPI(
    title="DashPilot AI API",
    description="Backend API for AI-powered dashboard generation",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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


def read_uploaded_file(file: UploadFile, file_content: bytes) -> pd.DataFrame:
    
    filename = file.filename.lower()

    try:
        if filename.endswith(".csv"):
            return pd.read_csv(BytesIO(file_content))

        if filename.endswith(".xlsx") or filename.endswith(".xls"):
            return pd.read_excel(BytesIO(file_content))

        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload a CSV or Excel file."
        )

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=400,
            detail=f"Could not read file: {str(error)}"
        )


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_content = await file.read()

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file uploaded."
        )

    df = read_uploaded_file(file, file_content)

    global latest_dataframe
    latest_dataframe = df.copy()

    if df.empty:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )

    preview_df = df.head(5).copy()
    preview_df = preview_df.where(pd.notnull(preview_df), None)

    profile = profile_dataframe(df)
    recommended_charts = recommend_charts(profile)
    dashboard_charts = generate_chart_payloads(df, recommended_charts)

    return {
        "filename": file.filename,
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "column_names": df.columns.tolist(),
        "preview": preview_df.to_dict(orient="records"),
        "profile": profile,
        "recommended_charts": recommended_charts,
        "dashboard_charts": dashboard_charts
    }

@app.post("/custom-chart")
def create_custom_chart(request: CustomChartRequest):
    global latest_dataframe

    if latest_dataframe is None:
        raise HTTPException(
            status_code=400,
            detail="No dataset uploaded yet. Please upload a CSV or Excel file first."
        )

    df = latest_dataframe.copy()

    chart = {
        "title": f"{request.y or request.x or 'Dataset'} by {request.x or 'table'}",
        "chart_type": request.chart_type,
        "x": request.x,
        "y": request.y,
        "aggregation": request.aggregation,
        "reason": "Custom chart generated from selected fields."
    }

    from services.chart_data import generate_chart_payloads

    chart_payloads = generate_chart_payloads(df, [chart])

    if not chart_payloads:
        raise HTTPException(
            status_code=400,
            detail="Could not generate chart with the selected fields."
        )

    return {
        "chart": chart_payloads[0]
    }