def recommend_charts(profile: dict) -> list[dict]:
    numeric_columns = profile.get("numeric_columns", [])
    categorical_columns = profile.get("categorical_columns", [])
    date_columns = profile.get("date_columns", [])

    recommendations = []

    # 1. Date + Numeric = Line / Area trend charts
    if date_columns and numeric_columns:
        date_col = date_columns[0]

        for metric in numeric_columns[:3]:
            recommendations.append({
                "title": f"{metric} over {date_col}",
                "chart_type": "line",
                "x": date_col,
                "y": metric,
                "aggregation": "sum",
                "reason": "Date and numeric columns are useful for trend analysis."
            })

        if len(numeric_columns) >= 2:
            recommendations.append({
                "title": f"{numeric_columns[0]} and {numeric_columns[1]} trend",
                "chart_type": "area",
                "x": date_col,
                "y": numeric_columns[0],
                "secondary_y": numeric_columns[1],
                "aggregation": "sum",
                "reason": "Multiple numeric metrics over time can show performance movement."
            })

    # 2. Category + Numeric = Bar charts
    if categorical_columns and numeric_columns:
        for category in categorical_columns[:3]:
            for metric in numeric_columns[:2]:
                recommendations.append({
                    "title": f"{metric} by {category}",
                    "chart_type": "bar",
                    "x": category,
                    "y": metric,
                    "aggregation": "sum",
                    "reason": "Categorical and numeric columns are ideal for comparison charts."
                })

    # 3. Category share = Donut/Pie chart
    if categorical_columns and numeric_columns:
        recommendations.append({
            "title": f"{numeric_columns[0]} contribution by {categorical_columns[0]}",
            "chart_type": "donut",
            "x": categorical_columns[0],
            "y": numeric_columns[0],
            "aggregation": "sum",
            "reason": "A donut chart helps show contribution by category."
        })

    # 4. Numeric distribution = Histogram
    if numeric_columns:
        recommendations.append({
            "title": f"{numeric_columns[0]} distribution",
            "chart_type": "histogram",
            "x": numeric_columns[0],
            "y": None,
            "aggregation": "count",
            "reason": "A histogram shows how numeric values are distributed."
        })

    # 5. Numeric + Numeric = Scatter plot
    if len(numeric_columns) >= 2:
        recommendations.append({
            "title": f"{numeric_columns[0]} vs {numeric_columns[1]}",
            "chart_type": "scatter",
            "x": numeric_columns[0],
            "y": numeric_columns[1],
            "aggregation": None,
            "reason": "Scatter plots help identify relationships between two numeric columns."
        })

    # 6. Table preview
    recommendations.append({
        "title": "Dataset table preview",
        "chart_type": "table",
        "x": None,
        "y": None,
        "aggregation": None,
        "reason": "A table gives users a direct preview of the uploaded data."
    })

    # Limit to useful number for MVP
    return recommendations[:8]