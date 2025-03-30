export interface Asset {
  id: string;
  title: string;
  description: string;
  type: string;
  icon?: string;
}

export interface KPI extends Asset {
  businessQuestions: Array<{
    id: string;
    question: string;
    description: string;
  }>;
  calculation: string;
  visualsAvailable: string[];
  affiliateApplicability: string[];
  data?: ChartData[];
}

export interface DataViz extends Asset {
  chartData: ChartData[];
  chartType: ChartType;
}

export interface Layout {
  id: string;
  title: string;
  description: string;
  pages: number;
  kpis: Array<{
    id: string;
    title: string;
    chartType?: ChartType;
  }>;
  preview: string;
}

export interface Storyboard {
  id: string;
  title: string;
  description: string;
  kpis: string[];
  affiliates: string[];
  preview: string;
}

export interface BusinessQuestion {
  id: string;
  question: string;
  description: string;
}

export type ChartType = "bar" | "line" | "pie" | "area";

export interface ChartData {
  name: string;
  value: number;
}
