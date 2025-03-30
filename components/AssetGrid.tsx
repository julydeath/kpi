"use clent";

import AssetModal from "./AssetModel";
import MetricCard from "./MetricCard";
import { useState } from "react";
import type { Asset } from "@/lib/types";

interface AssetGridProps {
  title: string;
  subtitle?: string;
  assets: Asset[];
  isLoading: Boolean;
}

// Loading skeleton for grid items
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-24" />
    ))}
  </div>
);

export default function AssetGrid({
  title,
  subtitle,
  assets,
  isLoading,
}: AssetGridProps) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleModelClose = () => {
    setSelectedAsset(null);
  };

  return (
    <div className="mt-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : assets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <MetricCard
              key={asset.id}
              title={asset.title}
              description={asset.description}
              icon={asset.icon}
              onClick={() => handleAssetClick(asset)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-500">No assets available.</p>
        </div>
      )}

      {selectedAsset && (
        <AssetModal asset={selectedAsset} onClose={handleModelClose} />
      )}
    </div>
  );
}
