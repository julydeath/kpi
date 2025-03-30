"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AssetGrid from "./AssetGrid";
import { api } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import LayoutDashboard from "./LayoutDashboard";
import { Search } from "lucide-react";
import useDebounce from "@/utils/useDebounce";
import { useState } from "react";
import RequestForm from "./RequestForm";

export default function Library() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "featured";

  const [input, setInput] = useState("");
  const [showRequest, setShowRequest] = useState(false);

  const debouncedValue = useDebounce(input, 1000);

  const { data: allFeaturedAssets = [], isLoading: featuredAssetsLoading } =
    useQuery({
      queryKey: ["featured", "assets"],
      queryFn: () => api.getFeaturesAssets(),
      enabled: activeTab === "featured",
    });

  const { data: allTrendingAssets = [], isLoading: trendingAssetsLoading } =
    useQuery({
      queryKey: ["trending", "assets"],
      queryFn: () => api.getTrendingAssets(),
      enabled: activeTab === "featured",
    });

  const { data: allKpis = [], isLoading: kpisLoading } = useQuery({
    queryKey: ["kpi", "assets"],
    queryFn: () => api.getKpis(),
    enabled: activeTab === "kpis",
  });

  const { data: allLayouts = [], isLoading: layoutLoading } = useQuery({
    queryKey: ["layout"],
    queryFn: () => api.getLayouts(),
    enabled: activeTab === "layout",
  });

  // Filter assets based on search term
  const featuredAssets = allFeaturedAssets.filter((asset) =>
    asset.title.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  const trendingAssets = allTrendingAssets.filter((asset) =>
    asset.title.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  const kpis = allKpis.filter((asset) =>
    asset.title.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  const layouts = allLayouts.filter((asset) =>
    asset.title.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  console.log({ allFeaturedAssets, featuredAssets });

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Library</h1>
            <p className="text-gray-500 mt-1">
              Browse for assets needed for report and dashboard analysis.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              className="px-4 py-2 bg-black rounded-md text-white hover:bg-gray-800 hover:cursor-pointer"
              onClick={() => setShowRequest(true)}
            >
              Request
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              type="text"
              placeholder="Search for assets..."
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>

        <div className="bg-gray-200 rounded-md">
          <div className="flex">
            <Link
              className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                activeTab === "featured"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              href={`/?tab=featured`}
            >
              Featured
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                activeTab === "kpis"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              href={`/?tab=kpis`}
            >
              KPIs
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                activeTab === "layout"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              href={`/?tab=layout`}
            >
              Layouts
            </Link>
            <Link
              className={`px-6 py-3 font-medium text-sm cursor-pointer ${
                activeTab === "storyboard"
                  ? "text-black border-b-2 border-gray-500"
                  : "text-gray-500"
              }`}
              href={`/?tab=storyboard`}
            >
              Storyboards
            </Link>
          </div>
        </div>

        <>
          {activeTab === "featured" && (
            <>
              <AssetGrid
                title="Featured"
                subtitle="Most popular assets across the organization"
                assets={featuredAssets}
                isLoading={featuredAssetsLoading}
              />
              <AssetGrid
                title="Trending"
                subtitle="Most trending assets across the organization"
                assets={trendingAssets}
                isLoading={trendingAssetsLoading}
              />
            </>
          )}

          {activeTab === "kpis" && (
            <AssetGrid
              title="Key Performance Indicators"
              subtitle="Metrics to track business performance"
              assets={kpis}
              isLoading={kpisLoading}
            />
          )}

          {activeTab === "layout" && (
            <div>
              <LayoutDashboard layouts={layouts} isLoading={layoutLoading} />
            </div>
          )}
          {activeTab === "storyboard" && <div>Story Board</div>}
        </>
      </div>
      {showRequest && <RequestForm onClose={() => setShowRequest(false)} />}
    </div>
  );
}
