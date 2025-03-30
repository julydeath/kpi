import {
  Asset,
  BusinessQuestion,
  DataViz,
  KPI,
  Layout,
  Storyboard,
} from "./types";

export const featuredAssets: Asset[] = [
  {
    id: "1",
    title: "Sales Performance",
    description:
      "Track monthly sales performance across all regions and product categories.This repository is a compilation of well-written, step-by-step guides for re-creating our favorite technologies from scratch.",
    type: "kpi",
    icon: "chart",
  },
  {
    id: "2",
    title: "Customer Retention",
    description: "Measure customer retention rates and identify churn patterns",
    type: "kpi",
    icon: "clock",
  },
  {
    id: "3",
    title: "Marketing ROI",
    description:
      "Analyze return on investment for marketing campaigns across channels",
    type: "dataviz",
    icon: "chart",
  },
  {
    id: "4",
    title: "Operational Efficiency",
    description:
      "Monitor key operational metrics and identify optimization opportunities",
    type: "kpi",
    icon: "chart",
  },
];

export const trendingAssets: Asset[] = [
  {
    id: "5",
    title: "Revenue Growth",
    description:
      "Track year-over-year revenue growth by product line and region",
    type: "kpi",
    icon: "chart",
  },
  {
    id: "6",
    title: "Customer Satisfaction",
    description:
      "Monitor NPS scores and customer satisfaction metrics over time",
    type: "dataviz",
    icon: "chart",
  },
  {
    id: "7",
    title: "Inventory Turnover",
    description:
      "Analyze inventory turnover rates and identify slow-moving products",
    type: "kpi",
    icon: "clock",
  },
  {
    id: "8",
    title: "Employee Productivity",
    description: "Measure employee productivity metrics across departments",
    type: "dataviz",
    icon: "chart",
  },
];

export const kpiDetails: Record<string, KPI> = {
  "1": {
    id: "1",
    title: "Sales Performance",
    description:
      "Track monthly sales performance across all regions and product categories",
    type: "kpi",
    icon: "chart",
    businessQuestions: [
      {
        id: "q1",
        question: "How are sales trending over time?",
        description: "Analyze month-over-month and year-over-year sales growth",
      },
      {
        id: "q2",
        question: "Which regions are performing best?",
        description:
          "Compare sales performance across different geographic regions",
      },
      {
        id: "q3",
        question: "What product categories drive the most revenue?",
        description:
          "Identify top-performing product categories by revenue contribution",
      },
    ],
    calculation:
      "SUM(sales_amount) GROUP BY time_period, region, product_category",
    visualsAvailable: ["Bar Chart", "Line Chart", "Area Chart", "Pie Chart"],
    affiliateApplicability: [
      "North America",
      "Europe",
      "Asia Pacific",
      "Latin America",
    ],
    data: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 2000 },
      { name: "Apr", value: 2780 },
      { name: "May", value: 1890 },
      { name: "Jun", value: 2390 },
    ],
  },
  "2": {
    id: "2",
    title: "Customer Retention",
    description: "Measure customer retention rates and identify churn patterns",
    type: "kpi",
    icon: "clock",
    businessQuestions: [
      {
        id: "q1",
        question: "What is our customer retention rate?",
        description:
          "Calculate the percentage of customers who continue to use our products/services",
      },
      {
        id: "q2",
        question: "What are the main reasons for customer churn?",
        description:
          "Identify patterns and factors contributing to customer attrition",
      },
    ],
    calculation:
      "(Customers at End of Period - New Customers) / Customers at Start of Period",
    visualsAvailable: ["Line Chart", "Bar Chart", "Area Chart"],
    affiliateApplicability: ["North America", "Europe"],
    data: [
      { name: "Q1", value: 85 },
      { name: "Q2", value: 83 },
      { name: "Q3", value: 88 },
      { name: "Q4", value: 91 },
    ],
  },
  "4": {
    id: "4",
    title: "Operational Efficiency",
    description:
      "Monitor key operational metrics and identify optimization opportunities",
    type: "kpi",
    icon: "chart",
    businessQuestions: [
      {
        id: "q1",
        question: "Which processes are most efficient?",
        description: "Identify processes with the highest efficiency ratings",
      },
      {
        id: "q2",
        question: "Where are the bottlenecks in our operations?",
        description: "Locate areas where operational flow is constrained",
      },
    ],
    calculation: "Output / Input * 100",
    visualsAvailable: ["Bar Chart", "Line Chart", "Pie Chart"],
    affiliateApplicability: ["North America", "Europe", "Asia Pacific"],
    data: [
      { name: "Process A", value: 75 },
      { name: "Process B", value: 63 },
      { name: "Process C", value: 82 },
      { name: "Process D", value: 91 },
      { name: "Process E", value: 45 },
    ],
  },
  "5": {
    id: "5",
    title: "Revenue Growth",
    description:
      "Track year-over-year revenue growth by product line and region",
    type: "kpi",
    icon: "chart",
    businessQuestions: [
      {
        id: "q1",
        question: "Which product lines are growing fastest?",
        description: "Identify product lines with the highest growth rates",
      },
      {
        id: "q2",
        question: "How does regional growth compare?",
        description:
          "Compare revenue growth across different geographic regions",
      },
    ],
    calculation:
      "((Current Period Revenue - Previous Period Revenue) / Previous Period Revenue) * 100",
    visualsAvailable: ["Bar Chart", "Line Chart", "Area Chart"],
    affiliateApplicability: [
      "North America",
      "Europe",
      "Asia Pacific",
      "Latin America",
    ],
    data: [
      { name: "Product A", value: 12 },
      { name: "Product B", value: 18 },
      { name: "Product C", value: 5 },
      { name: "Product D", value: 22 },
      { name: "Product E", value: -3 },
    ],
  },
  "7": {
    id: "7",
    title: "Inventory Turnover",
    description:
      "Analyze inventory turnover rates and identify slow-moving products",
    type: "kpi",
    icon: "clock",
    businessQuestions: [
      {
        id: "q1",
        question: "Which products have the highest turnover?",
        description:
          "Identify products that sell through inventory most quickly",
      },
      {
        id: "q2",
        question: "Where do we have excess inventory?",
        description: "Locate areas where inventory is moving slowly",
      },
    ],
    calculation: "Cost of Goods Sold / Average Inventory",
    visualsAvailable: ["Bar Chart", "Pie Chart"],
    affiliateApplicability: ["North America", "Europe", "Asia Pacific"],
    data: [
      { name: "Electronics", value: 8.2 },
      { name: "Clothing", value: 6.5 },
      { name: "Home Goods", value: 4.3 },
      { name: "Sporting Goods", value: 5.7 },
      { name: "Books", value: 3.1 },
    ],
  },
};

export const dataVizDetails: Record<string, DataViz> = {
  "3": {
    id: "3",
    title: "Marketing ROI",
    description:
      "Analyze return on investment for marketing campaigns across channels",
    type: "dataviz",
    icon: "chart",
    chartType: "bar",
    chartData: [
      { name: "Social Media", value: 4000 },
      { name: "Email", value: 3000 },
      { name: "Search", value: 2000 },
      { name: "Display", value: 2780 },
      { name: "Content", value: 1890 },
      { name: "Events", value: 2390 },
    ],
  },
  "6": {
    id: "6",
    title: "Customer Satisfaction",
    description:
      "Monitor NPS scores and customer satisfaction metrics over time",
    type: "dataviz",
    icon: "chart",
    chartType: "line",
    chartData: [
      { name: "Jan", value: 75 },
      { name: "Feb", value: 78 },
      { name: "Mar", value: 82 },
      { name: "Apr", value: 80 },
      { name: "May", value: 85 },
      { name: "Jun", value: 83 },
    ],
  },
  "8": {
    id: "8",
    title: "Employee Productivity",
    description: "Measure employee productivity metrics across departments",
    type: "dataviz",
    icon: "chart",
    chartType: "area",
    chartData: [
      { name: "Engineering", value: 92 },
      { name: "Sales", value: 88 },
      { name: "Marketing", value: 85 },
      { name: "Support", value: 90 },
      { name: "Operations", value: 82 },
    ],
  },
};

export const layouts: Layout[] = [
  {
    id: "layout1",
    title: "Sales Dashboard",
    description: "Broad view of sales performance across regions",
    pages: 3,
    kpis: [
      { id: "1", title: "Sales Performance", chartType: "bar" },
      { id: "5", title: "Revenue Growth", chartType: "line" },
      { id: "3", title: "Marketing ROI", chartType: "pie" },
    ],
    preview: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "layout2",
    title: "Customer Insights",
    description:
      "Key metrics related to customer behavior and satisfaction.This repository is a compilation of well-written, step-by-step guides for re-creating our favorite technologies from scratch.",
    pages: 2,
    kpis: [
      { id: "2", title: "Customer Retention", chartType: "area" },
      { id: "6", title: "Customer Satisfaction", chartType: "line" },
    ],
    preview: "/placeholder.svg?height=400&width=600",
  },
];

export const storyboards: Storyboard[] = [
  {
    id: "storyboard1",
    title: "Quarterly Business Review",
    description: "Executive presentation of quarterly performance metrics",
    kpis: ["Sales Performance", "Revenue Growth", "Customer Satisfaction"],
    affiliates: ["North America", "Europe", "Asia Pacific"],
    preview: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "storyboard2",
    title: "Marketing Campaign Analysis",
    description: "Detailed analysis of marketing campaign performance",
    kpis: ["Marketing ROI", "Customer Acquisition Cost", "Conversion Rate"],
    affiliates: ["North America", "Europe"],
    preview: "/placeholder.svg?height=400&width=600",
  },
];

export const businessQuestions: BusinessQuestion[] = [
  {
    id: "1",
    question: "How does this metric compare to industry benchmarks?",
    description:
      "Understand how our performance compares to industry standards and competitors",
  },
  {
    id: "2",
    question: "What factors are driving changes in this KPI over time?",
    description:
      "Identify key drivers and influencing factors affecting this metric",
  },
  {
    id: "3",
    question: "How does this metric vary across different segments?",
    description:
      "Analyze performance variations across customer segments, regions, or product categories",
  },
  {
    id: "4",
    question: "What actions can improve this metric in the short term?",
    description:
      "Determine actionable steps to positively impact this KPI in the next quarter",
  },
];

//API functions to get data

export const api = {
  getFeaturesAssets: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return featuredAssets;
  },

  getTrendingAssets: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return trendingAssets;
  },

  getKpis: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const kpis = [...featuredAssets, ...trendingAssets].filter(
      (asset) => asset.type === "kpi"
    );
    return kpis;
  },

  getKPIDetails: async (id: string, type: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (type === "kpi") {
      return kpiDetails[id] || null;
    } else if (type === "dataviz") {
      return dataVizDetails[id] || null;
    } else {
      return null;
    }
  },

  getDataVizDetails: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dataVizDetails[id] || null;
  },

  getLayouts: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return layouts;
  },

  getLayoutDetails: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const layout = layouts.find((l) => l.id === id) || null;
    console.log({ layout });
    return layout;
  },

  getBusinessQuestions: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return businessQuestions;
  },

  getAllKPIDetails: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return Object.values(kpiDetails);
  },
};
