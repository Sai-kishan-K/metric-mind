import pandas as pd


def detect_column_type(df: pd.DataFrame, column: str) -> str:
    series = df[column]
    column_lower = column.lower()

    non_null_series = series.dropna()

    if non_null_series.empty:
        return "empty"

    # Detect ID columns
    if (
        "id" in column_lower
        or column_lower.endswith("_id")
        or column_lower.endswith("id")
    ):
        return "id"

    # Detect numeric columns
    if pd.api.types.is_numeric_dtype(series):
        return "numeric"

    # Try to detect date columns
    if (
        "date" in column_lower
        or "time" in column_lower
        or "created" in column_lower
        or "updated" in column_lower
    ):
        try:
            parsed_dates = pd.to_datetime(non_null_series, errors="coerce")
            valid_ratio = parsed_dates.notna().mean()

            if valid_ratio >= 0.7:
                return "date"
        except Exception:
            pass

    # Detect categorical columns
    unique_count = non_null_series.nunique()
    total_count = len(non_null_series)
    unique_ratio = unique_count / total_count

    if unique_count <= 30 or unique_ratio <= 0.2:
        return "categorical"

    # Otherwise text
    return "text"


def profile_dataframe(df: pd.DataFrame) -> dict:
    total_rows = len(df)
    total_columns = len(df.columns)

    numeric_columns = []
    categorical_columns = []
    date_columns = []
    text_columns = []
    id_columns = []
    empty_columns = []

    column_profiles = []

    for column in df.columns:
        column_type = detect_column_type(df, column)

        missing_count = int(df[column].isna().sum())
        missing_percentage = round((missing_count / total_rows) * 100, 2) if total_rows > 0 else 0

        unique_count = int(df[column].nunique(dropna=True))

        quality_score = round(100 - missing_percentage, 2)

        profile = {
            "name": column,
            "type": column_type,
            "missing_count": missing_count,
            "missing_percentage": missing_percentage,
            "unique_count": unique_count,
            "quality_score": quality_score,
            "sample_values": df[column].dropna().head(5).astype(str).tolist()
        }

        column_profiles.append(profile)

        if column_type == "numeric":
            numeric_columns.append(column)
        elif column_type == "categorical":
            categorical_columns.append(column)
        elif column_type == "date":
            date_columns.append(column)
        elif column_type == "text":
            text_columns.append(column)
        elif column_type == "id":
            id_columns.append(column)
        elif column_type == "empty":
            empty_columns.append(column)

    total_missing_values = int(df.isna().sum().sum())
    total_cells = total_rows * total_columns

    overall_quality_score = (
        round(100 - ((total_missing_values / total_cells) * 100), 2)
        if total_cells > 0
        else 0
    )

    return {
        "rows": total_rows,
        "columns": total_columns,
        "numeric_columns": numeric_columns,
        "categorical_columns": categorical_columns,
        "date_columns": date_columns,
        "text_columns": text_columns,
        "id_columns": id_columns,
        "empty_columns": empty_columns,
        "total_missing_values": total_missing_values,
        "overall_quality_score": overall_quality_score,
        "column_profiles": column_profiles
    }