import pandas as pd
from typing import Optional


def clean_chart_records(records: list[dict]) -> list[dict]:
    cleaned_records = []

    for record in records:
        cleaned_record = {}

        for key, value in record.items():
            if pd.isna(value):
                cleaned_record[key] = None
            elif hasattr(value, "item"):
                cleaned_record[key] = value.item()
            else:
                cleaned_record[key] = value

        cleaned_records.append(cleaned_record)

    return cleaned_records


def aggregate_dataframe(
    df: pd.DataFrame,
    x: Optional[str],
    y: Optional[str],
    aggregation: Optional[str],
    limit: int = 12
) -> list[dict]:
    if x is None and y is None:
        preview_df = df.head(limit).copy()
        preview_df = preview_df.where(pd.notnull(preview_df), None)
        return clean_chart_records(preview_df.to_dict(orient="records"))

    if x and y:
        working_df = df[[x, y]].dropna().copy()

        if working_df.empty:
            return []

        if aggregation == "sum":
            result_df = working_df.groupby(x, as_index=False)[y].sum()
        elif aggregation == "average" or aggregation == "avg" or aggregation == "mean":
            result_df = working_df.groupby(x, as_index=False)[y].mean()
        elif aggregation == "count":
            result_df = working_df.groupby(x, as_index=False)[y].count()
        elif aggregation == "min":
            result_df = working_df.groupby(x, as_index=False)[y].min()
        elif aggregation == "max":
            result_df = working_df.groupby(x, as_index=False)[y].max()
        else:
            result_df = working_df.groupby(x, as_index=False)[y].sum()

        result_df = result_df.sort_values(by=y, ascending=False).head(limit)

        return clean_chart_records(result_df.to_dict(orient="records"))

    if x and not y:
        working_df = df[[x]].dropna().copy()

        if working_df.empty:
            return []

        result_df = (
            working_df[x]
            .value_counts()
            .head(limit)
            .reset_index()
        )

        result_df.columns = [x, "count"]

        return clean_chart_records(result_df.to_dict(orient="records"))

    return []


def create_histogram_data(
    df: pd.DataFrame,
    column: str,
    bins: int = 8
) -> list[dict]:
    if column not in df.columns:
        return []

    series = pd.to_numeric(df[column], errors="coerce").dropna()

    if series.empty:
        return []

    try:
        bin_result = pd.cut(series, bins=bins)
        histogram_df = bin_result.value_counts().sort_index().reset_index()
        histogram_df.columns = ["range", "count"]
        histogram_df["range"] = histogram_df["range"].astype(str)

        return clean_chart_records(histogram_df.to_dict(orient="records"))

    except Exception:
        return []


def create_scatter_data(
    df: pd.DataFrame,
    x: str,
    y: str,
    limit: int = 200
) -> list[dict]:
    if x not in df.columns or y not in df.columns:
        return []

    working_df = df[[x, y]].dropna().copy()

    if working_df.empty:
        return []

    working_df[x] = pd.to_numeric(working_df[x], errors="coerce")
    working_df[y] = pd.to_numeric(working_df[y], errors="coerce")
    working_df = working_df.dropna().head(limit)

    return clean_chart_records(working_df.to_dict(orient="records"))


def create_time_series_data(
    df: pd.DataFrame,
    x: str,
    y: str,
    aggregation: Optional[str],
    limit: int = 30
) -> list[dict]:
    if x not in df.columns or y not in df.columns:
        return []

    working_df = df[[x, y]].dropna().copy()

    if working_df.empty:
        return []

    working_df[x] = pd.to_datetime(working_df[x], errors="coerce")
    working_df[y] = pd.to_numeric(working_df[y], errors="coerce")
    working_df = working_df.dropna()

    if working_df.empty:
        return []

    working_df["_date_group"] = working_df[x].dt.to_period("M").astype(str)

    if aggregation == "average" or aggregation == "avg" or aggregation == "mean":
        result_df = working_df.groupby("_date_group", as_index=False)[y].mean()
    elif aggregation == "count":
        result_df = working_df.groupby("_date_group", as_index=False)[y].count()
    else:
        result_df = working_df.groupby("_date_group", as_index=False)[y].sum()

    result_df = result_df.rename(columns={"_date_group": x})
    result_df = result_df.sort_values(by=x).head(limit)

    return clean_chart_records(result_df.to_dict(orient="records"))


def generate_chart_payloads(
    df: pd.DataFrame,
    recommended_charts: list[dict]
) -> list[dict]:
    chart_payloads = []

    for chart in recommended_charts:
        chart_type = chart.get("chart_type")
        x = chart.get("x")
        y = chart.get("y")
        aggregation = chart.get("aggregation")

        chart_data = []

        if chart_type in ["line", "area"] and x and y:
            chart_data = create_time_series_data(df, x, y, aggregation)

        elif chart_type in ["bar", "donut", "pie"] and x and y:
            chart_data = aggregate_dataframe(df, x, y, aggregation)

        elif chart_type == "histogram" and x:
            chart_data = create_histogram_data(df, x)

        elif chart_type == "scatter" and x and y:
            chart_data = create_scatter_data(df, x, y)

        elif chart_type == "table":
            chart_data = aggregate_dataframe(df, None, None, None)

        else:
            chart_data = aggregate_dataframe(df, x, y, aggregation)

        chart_payloads.append({
            **chart,
            "data": chart_data
        })

    return chart_payloads