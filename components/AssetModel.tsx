//@ts-nocheck
"use client";

import { useState } from "react";
import { X, Heart, Link, BarChart2, FileText, Layout } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BusinessQuestions from "./BusinessQuestions";
import { api } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import ChartTypeSelector from "./ChartTypeSelector";
import { DynamicChart } from "./ui/chart";
import { Asset, ChartType } from "@/lib/types";

interface AssetModalProps {
  asset: Asset;
  onClose: () => void;
}

export default function AssetModal({ asset, onClose }: AssetModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState<ChartType>("bar");

  const { data: assetDetails } = useQuery({
    queryKey: ["asset", asset.type, asset.id],
    queryFn: () => api.getKPIDetails(asset.id, asset.type),
  });

  // Fetch business questions
  const { data: businessQuestions = [] } = useQuery({
    queryKey: ["businessQuestions"],
    queryFn: api.getBusinessQuestions,
  });

  const getIcon = () => {
    switch (asset.type) {
      case "kpi":
        return <BarChart2 className="h-6 w-6 text-black" />;
      case "dataviz":
        return <BarChart2 className="h-6 w-6 text-black" />;
      case "layout":
        return <Layout className="h-6 w-6 text-black" />;
      case "storyboard":
        return <FileText className="h-6 w-6 text-black" />;
      default:
        return <BarChart2 className="h-6 w-6 text-black" />;
    }
  };

  const chartData = assetDetails?.data || assetDetails?.chartData || [];
  const availableChartTypes: ChartType[] =
    (assetDetails?.visualsAvailable
      ?.map((type) => {
        if (type.toLowerCase().includes("bar")) return "bar";
        if (type.toLowerCase().includes("line")) return "line";
        if (type.toLowerCase().includes("area")) return "area";
        if (type.toLowerCase().includes("pie")) return "pie";
        return "bar";
      })
      .filter(Boolean) as ChartType[]) ||
    (assetDetails?.chartType ? [assetDetails.chartType] : ["bar"]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="fixed inset-0 flex items-center bg-black/50 justify-center z-50 p-4 scroll-smooth">
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

        {/* Layout icon and title */}
        <div className="flex flex-col items-center px-6 pb-4">
          <div className="p-2 bg-gray-100 rounded-md mb-2">{getIcon()}</div>
          <h2 className="text-xl font-bold text-center">
            {asset.title || "INTES"}
          </h2>
          <p className="text-sm text-gray-500 text-center">
            {asset.description || "Descriptive name of the Layout"}
          </p>
        </div>

        {/* Tags */}
        <div className="flex justify-center gap-2 px-6 py-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            #comms
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            #coverage
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            #stakeholders
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 px-6 py-8 border-b border-gray-200">
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">2485</p>
            <p className="text-xs text-gray-500">Used Ct.</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">Universal</p>
            <p className="text-xs text-gray-500">Type</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">6</p>
            <p className="text-xs text-gray-500">Pages No. 💬</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">03/31/2025</p>
            <p className="text-xs text-gray-500">Last Updated</p>
          </div>
        </div>

        {/* Chart Section */}
        {chartData && chartData.length > 0 && (
          <div className="px-6 py-4 border-b border-gray-200">
            {availableChartTypes.length > 0 && (
              <div className="mb-3">
                <ChartTypeSelector
                  selectedType={selectedChartType}
                  onChange={setSelectedChartType}
                  avalibleTypes={availableChartTypes}
                />
              </div>
            )}

            <div className="h-60 bg-white rounded-lg">
              <DynamicChart
                data={chartData}
                type={selectedChartType}
                height="100%"
              />
            </div>
          </div>
        )}

        {/* Business Questions */}
        <div className="px-6 py-4">
          <h3 className="text-md font-bold mb-3">Business Questions</h3>

          <div className="grid grid-cols-2 gap-4">
            {businessQuestions.slice(0, 4).map((q, index) => (
              <div key={q.id || index} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-semibold mb-1">
                  Question {index + 1}
                </p>
                <p className="text-xs text-gray-700">
                  {q.description ||
                    "Short description of the item goes nicely here."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite button */}
        <div className="px-6 py-4">
          <button
            className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-md hover:bg-blue-800"
            onClick={toggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            Favorite Item
          </button>
        </div>
      </div>
    </div>
  );
}
