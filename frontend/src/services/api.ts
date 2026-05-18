export const API_BASE_URL = "http://127.0.0.1:8000";

export type ColumnProfile = {
  name: string;
  type: string;
  missing_count: number;
  missing_percentage: number;
  unique_count: number;
  quality_score: number;
  sample_values: string[];
};

export type DatasetProfile = {
  rows: number;
  columns: number;
  numeric_columns: string[];
  categorical_columns: string[];
  date_columns: string[];
  text_columns: string[];
  id_columns: string[];
  empty_columns: string[];
  total_missing_values: number;
  overall_quality_score: number;
  column_profiles: ColumnProfile[];
};

export type RecommendedChart = {
  title: string;
  chart_type: string;
  x: string | null;
  y: string | null;
  secondary_y?: string | null;
  aggregation: string | null;
  reason: string;
};

export type DashboardChart = RecommendedChart & {
  data: Record<string, unknown>[];
};

export type UploadResponse = {
  filename: string;
  rows: number;
  columns: number;
  column_names: string[];
  preview: Record<string, unknown>[];
  profile: DatasetProfile;
  recommended_charts: RecommendedChart[];
  dashboard_charts: DashboardChart[];
};

export async function uploadDataset(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || "Failed to upload dataset");
  }

  return response.json();
}