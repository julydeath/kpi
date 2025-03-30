//@ts-nocheck
"use client";

import { useState } from "react";
import type { KPI, ChartType } from "@/lib/types";
import { Check, Plus } from "lucide-react";
import ChartTypeSelector from "./ChartTypeSelector";
import { DynamicChart } from "./ui/chart";

export default function KpiSelector({ kpis, onSelect, initialSelected = [] }) {
  const [selectedKpis, setSelectedKpis] = useState(
    initialSelected
      .map((item) => {
        const kpi = kpis.find((k) => k.id === item.id);
        if (kpi) {
          return {
            kpi,
            chartType: item.chartType || "bar",
          };
        }
        return null;
      })
      .filter(Boolean)
  );

  const handleToggleKpi = (kpi: KPI) => {
    const isSelected = selectedKpis.some((item) => item.kpi.id === kpi.id);

    if (isSelected) {
      setSelectedKpis(selectedKpis.filter((item) => item.kpi.id !== kpi.id));
    } else {
      // Get available chart types from the KPI or default to bar
      const availableTypes = (kpi.visualsAvailable
        ?.map((type) => {
          if (type.toLowerCase().includes("bar")) return "bar";
          if (type.toLowerCase().includes("line")) return "line";
          if (type.toLowerCase().includes("area")) return "area";
          if (type.toLowerCase().includes("pie")) return "pie";
          return "bar";
        })
        .filter(Boolean) as ChartType[]) || ["bar"];

      setSelectedKpis([
        ...selectedKpis,
        { kpi, chartType: availableTypes[0] || "bar" },
      ]);
    }
  };

  const handleChartTypeChange = (kpiId: string, chartType: ChartType) => {
    setSelectedKpis(
      selectedKpis.map((item) =>
        item.kpi.id === kpiId ? { ...item, chartType } : item
      )
    );
  };

  // Update parent component when selections change
  const handleApply = () => {
    onSelect(selectedKpis);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-1">
        {kpis.map((kpi) => {
          const isSelected = selectedKpis.some(
            (item) => item.kpi.id === kpi.id
          );
          const selectedItem = selectedKpis.find(
            (item) => item.kpi.id === kpi.id
          );

          return (
            <div
              key={kpi.id}
              className={`border rounded-lg p-4 ${
                isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{kpi.title}</h3>
                <button
                  onClick={() => handleToggleKpi(kpi)}
                  className={`p-1 rounded-full ${
                    isSelected
                      ? "bg-black text-white hover:bg-gray-600"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {isSelected ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {kpi.description}
              </p>

              {isSelected && selectedItem && (
                <div className="mt-3 space-y-3">
                  <ChartTypeSelector
                    selectedType={selectedItem.chartType}
                    onChange={(type) => handleChartTypeChange(kpi.id, type)}
                    availibleTypes={kpi.visualsAvailable
                      ?.map((type) => {
                        if (type.toLowerCase().includes("bar")) return "bar";
                        if (type.toLowerCase().includes("line")) return "line";
                        if (type.toLowerCase().includes("area")) return "area";
                        if (type.toLowerCase().includes("pie")) return "pie";
                        return "bar";
                      })
                      .filter(Boolean)}
                  />

                  {kpi.data && (
                    <div className="h-40 bg-white rounded border border-gray-200 p-2">
                      <DynamicChart
                        data={kpi.data}
                        type={selectedItem.chartType}
                        height="100%"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-3 border-t">
        <div>
          <span className="text-sm text-gray-500">
            {selectedKpis.length} KPI{selectedKpis.length !== 1 ? "s" : ""}{" "}
            selected
          </span>
        </div>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-black rounded-md text-white hover:bg-gray-700"
          disabled={selectedKpis.length === 0}
        >
          Apply Selection
        </button>
      </div>
    </div>
  );
}
