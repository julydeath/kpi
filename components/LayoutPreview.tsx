//@ts-nocheck
import { DynamicChart } from "./ui/chart";

export default function LayoutPreview({ selectedKpis, template = "2x2" }: any) {
  if (selectedKpis.length === 0) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
        <p className="text-gray-500">Select KPIs to preview layout</p>
      </div>
    );
  }

  const gridClass = {
    "2x2": "grid-cols-2",
    "3x1": "grid-cols-3",
    "1x3": "grid-cols-1",
  }[template];

  return (
    <div
      className={`aspect-video bg-white rounded-lg border border-gray-300 p-4 grid ${gridClass} gap-4`}
    >
      {selectedKpis.map(({ kpi, chartType }, index) => (
        <div
          key={kpi.id}
          className="bg-white rounded border border-gray-200 p-2 shadow-sm"
        >
          <h4 className="text-sm font-medium text-gray-700 mb-1">
            {kpi.title}
          </h4>
          <div className="h-60">
            {kpi.data && (
              <DynamicChart data={kpi.data} type={chartType} height="100%" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
