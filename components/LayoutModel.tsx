//@ts-nocheck
"use client";

import { X, Plus, Edit, Copy, ChevronDown, Link, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Layout, KPI, ChartType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/data";
import KpiSelector from "./KpiSelector";
import LayoutPreview from "./LayoutPreview";

interface LayoutModalProps {
  layout?: Layout | null;
  onClose: () => void;
}

export default function LayoutModal({ layout, onClose }: LayoutModalProps) {
  // If no layout is provided, show the create layout screen
  const isCreating = !layout;

  // Default values for new layout
  const defaultLayout = {
    id: "new",
    title: "INTES",
    description: "Descriptive name of the Layout",
    pages: 6,
    kpis: [],
    preview: "/placeholder.svg?height=400&width=600",
  };

  const currentLayout = layout || defaultLayout;

  // State for form fields
  const [title, setTitle] = useState(currentLayout.title);
  const [description, setDescription] = useState(currentLayout.description);
  const [pages, setPages] = useState(currentLayout.pages);
  const [lastUpdated, setLastUpdated] = useState("07/23/2024");
  const [itemCount, setItemCount] = useState(2485);
  const [type, setType] = useState("Universal");
  const [showKpiSelector, setShowKpiSelector] = useState(false);
  const [selectedKpis, setSelectedKpis] = useState<
    Array<{ kpi: KPI; chartType: ChartType }>
  >([]);

  // Sample business questions
  const businessQuestions = [
    {
      id: 1,
      title: "Question 1",
      description: "Short description of the item goes nicely here.",
    },
    {
      id: 2,
      title: "Question 2",
      description: "Short description of the item goes nicely here.",
    },
    {
      id: 3,
      title: "Question 3",
      description: "Short description of the item goes nicely here.",
    },
    {
      id: 4,
      title: "Question 4",
      description: "Short description of the item goes nicely here.",
    },
  ];

  // Fetch all KPIs for selection
  const { data: kpis = [] } = useQuery({
    queryKey: ["kpis", "all"],
    queryFn: api.getAllKPIDetails,
  });

  // Load KPI details for existing layout
  useEffect(() => {
    if (!isCreating && layout && layout.kpis.length > 0 && kpis.length > 0) {
      const mappedKpis = layout.kpis
        .map((kpi) => {
          const kpiDetails = kpis.find((k) => k.id === kpi.id);
          return kpiDetails
            ? {
                kpi: kpiDetails,
                chartType: kpi.chartType || "bar",
              }
            : null;
        })
        .filter(Boolean) as Array<{ kpi: KPI; chartType: ChartType }>;

      setSelectedKpis(mappedKpis);
    }
  }, [isCreating, layout, kpis]);

  const handleKpiSelection = (
    selected: Array<{ kpi: KPI; chartType: ChartType }>
  ) => {
    setSelectedKpis(selected);
    setShowKpiSelector(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="flex justify-end p-4 gap-2">
          <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <Link className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover: cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center px-6 pb-4">
          <div className="bg-gray-100 p-2 rounded mr-3">
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-center">{title}</h2>
          <p className="text-sm text-gray-500 text-center">
            {description || "Descriptive name of the Layout"}
          </p>
        </div>

        {/* Main content */}
        <div className="p-4 pb-6">
          {/* Categories/Tags */}
          <div className="flex gap-2 mb-4 justify-center">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-xs">
              #accounts
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-xs">
              #coverage
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-xs">
              #stakeholders
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 px-6 py-8 border-b border-gray-200">
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">{itemCount}</p>
              <p className="text-xs text-gray-500">Items Id</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">{type}</p>
              <p className="text-xs text-gray-500">Type</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">{pages}</p>
              <p className="text-xs text-gray-500">Pages No. 💬</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">{lastUpdated}</p>
              <p className="text-xs text-gray-500">Last Updated</p>
            </div>
          </div>

          {/* KPI Section */}
          {(selectedKpis.length > 0 ||
            (currentLayout.kpis && currentLayout.kpis.length > 0)) && (
            <div className="mb-6 mt-6 p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Used KPIs</h3>
                <button className="text-xs text-blue-600 hover:text-blue-800">
                  Manage KPIs
                </button>
              </div>
              <div className="space-y-2">
                {selectedKpis.length > 0
                  ? selectedKpis.map(({ kpi, chartType }) => (
                      <div
                        key={kpi.id}
                        className="bg-gray-50 p-2 rounded-md flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm font-medium">{kpi.title}</p>
                          <p className="text-xs text-gray-500">
                            {chartType} chart
                          </p>
                        </div>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          View
                        </button>
                      </div>
                    ))
                  : currentLayout.kpis &&
                    currentLayout.kpis.map((kpi) => (
                      <div
                        key={kpi.id}
                        className="bg-gray-50 p-2 rounded-md flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {kpi.title || `KPI ${kpi.id}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {kpi.chartType || "bar"} chart
                          </p>
                        </div>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          View
                        </button>
                      </div>
                    ))}
              </div>
            </div>
          )}

          {/* Layout Preview (simple placeholder) */}
          {(selectedKpis.length > 0 ||
            (currentLayout.kpis && currentLayout.kpis.length > 0)) && (
            <div className="mb-6 p-4">
              <h3 className="font-semibold mb-4">Layout Preview</h3>
              <div className="bg-gray-100 p-4 rounded-md">
                <LayoutPreview
                  selectedKpis={
                    selectedKpis.length > 0
                      ? selectedKpis
                      : (currentLayout.kpis || []).map((kpi) => ({
                          kpi: {
                            id: kpi.id,
                            title: kpi.title || `KPI ${kpi.id}`,
                            description: "",
                            datasource: "",
                            refreshRate: "",
                          },
                          chartType: kpi.chartType || "bar",
                        }))
                  }
                  template="2x2"
                />
              </div>
            </div>
          )}

          {/* Business Questions Section */}
          <h3 className="font-semibold p-4">Business Questions</h3>
          <div className="grid grid-cols-2 gap-4 mb-4 p-4">
            {businessQuestions.map((question) => (
              <div key={question.id}>
                <p className="text-sm font-medium">{question.title}</p>
                <p className="text-xs text-gray-500">{question.description}</p>
              </div>
            ))}
          </div>

          {/* Favorite Button */}
          <div className="px-6 py-4 flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
              <Copy className="h-4 w-4" />
              Duplicate
            </button>
            <button className="w-full hover:cursor-pointer flex items-center justify-center gap-2 py-3 bg-black text-white rounded-md hover:bg-gray-800">
              <Heart className={`h-4 w-4 fill-current`} />
              Favorite Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
