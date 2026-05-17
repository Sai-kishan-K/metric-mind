import { BarChart3, LineChart, PieChart } from "lucide-react";

export const sampleData = [
  { month: "Jan", revenue: 42000, profit: 12000, orders: 320 },
  { month: "Feb", revenue: 51000, profit: 16000, orders: 410 },
  { month: "Mar", revenue: 48000, profit: 14000, orders: 390 },
  { month: "Apr", revenue: 61000, profit: 21000, orders: 470 },
  { month: "May", revenue: 72000, profit: 26000, orders: 530 },
  { month: "Jun", revenue: 69000, profit: 24000, orders: 510 },
];

export const regionData = [
  { region: "Europe", sales: 132000 },
  { region: "Asia", sales: 98000 },
  { region: "North America", sales: 155000 },
  { region: "Middle East", sales: 64000 },
  { region: "Africa", sales: 42000 },
];

export const categoryData = [
  { name: "Software", value: 42 },
  { name: "Services", value: 28 },
  { name: "Hardware", value: 18 },
  { name: "Support", value: 12 },
];

export const columns = [
  { name: "Order Date", type: "Date", quality: "98%" },
  { name: "Revenue", type: "Numeric", quality: "100%" },
  { name: "Profit", type: "Numeric", quality: "100%" },
  { name: "Region", type: "Category", quality: "97%" },
  { name: "Product", type: "Category", quality: "95%" },
  { name: "Customer ID", type: "Identifier", quality: "100%" },
];

export const suggestedCharts = [
  { title: "Monthly Revenue Trend", type: "Line", confidence: "High", icon: LineChart },
  { title: "Sales by Region", type: "Bar", confidence: "High", icon: BarChart3 },
  { title: "Category Contribution", type: "Donut", confidence: "Medium", icon: PieChart },
];

export const initialChatMessages = [
  {
    role: "ai",
    text: "I found Revenue, Profit, Region, Product and Order Date. I can create KPIs, charts, or calculated columns from plain English.",
  },
  {
    role: "user",
    text: "Create a profit margin column",
  },
  {
    role: "ai",
    text: "Created Profit Margin = Profit / Revenue * 100. The new column is now available for charts.",
  },
];