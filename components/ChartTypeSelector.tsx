import { ChartType } from "@/lib/types";
import { AreaChart, BarChart2, LineChart, PieChart } from "lucide-react";

interface ChartTypeSelectorProps {
  selectedType: ChartType;
  onChange: (type: ChartType) => void;
  availibleTypes: ChartType[];
}

export default function ChartTypeSelector({
  selectedType,
  onChange,
  availibleTypes = ["bar", "line", "area", "pie"],
}: ChartTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {availibleTypes.includes("bar") && (
        <button
          type="button"
          onClick={() => onChange("bar")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
            selectedType === "bar"
              ? "bg-blue-100 text-black border border-gray-500"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <BarChart2 className="h-4 w-4" />
          Bar
        </button>
      )}

      {availibleTypes.includes("line") && (
        <button
          type="button"
          onClick={() => onChange("line")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
            selectedType === "line"
              ? "bg-blue-100 text-black border border-gray-500"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <LineChart className="h-4 w-4" />
          Line
        </button>
      )}

      {availibleTypes.includes("area") && (
        <button
          type="button"
          onClick={() => onChange("area")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
            selectedType === "area"
              ? "bg-blue-100 text-black border border-gray-500"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <AreaChart className="h-4 w-4" />
          Area
        </button>
      )}

      {availibleTypes.includes("pie") && (
        <button
          type="button"
          onClick={() => onChange("pie")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
            selectedType === "pie"
              ? "bg-blue-100 text-black border border-gray-500"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <PieChart className="h-4 w-4" />
          Pie
        </button>
      )}
    </div>
  );
}
