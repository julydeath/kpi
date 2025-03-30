import { BarChart2, Clock, AlertCircle } from "lucide-react"

interface MetricCardProps {
  title: string
  description: string
  icon?: string
  onClick: () => void
}

export default function MetricCard({ title, description, icon = "chart", onClick }: MetricCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "chart":
        return <BarChart2 className="h-6 w-6 text-black" />
      case "clock":
        return <Clock className="h-6 w-6 text-black" />
      case "alert":
        return <AlertCircle className="h-6 w-6 text-black" />
      default:
        return <BarChart2 className="h-6 w-6 text-black" />
    }
  }

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-blue-50 rounded-full">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  )
}

