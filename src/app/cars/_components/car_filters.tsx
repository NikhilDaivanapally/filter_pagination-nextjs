"use client";

import { Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import FilterControls from "./filter_controls";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CarFiltersProps = {
  filters: {
    makes: string[];
    colors: string[];
    bodyTypes: string[];
    fuelTypes: string[];
    transmissions: string[];
    priceRange: { min: number; max: number };
  };
};

const CarFilters = ({ filters }: CarFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter values from searchParams
  const currentMake = searchParams.get("make") || "";
  const currentColor = searchParams.get("color") || "";
  const currentBodyType = searchParams.get("bodyType") || "";
  const currentFuelType = searchParams.get("fuelType") || "";
  const currentTransmission = searchParams.get("transmission") || "";
  const currentMinPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice")!)
    : filters?.priceRange?.min;
  const currentMaxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice")!)
    : filters?.priceRange?.max;

  // local state for filters
  const [make, setMake] = useState(currentMake);
  const [color, setColor] = useState(currentColor);
  const [bodyType, setBodyType] = useState(currentBodyType);
  const [fuelType, setFuelType] = useState(currentFuelType);
  const [transmission, setTransmission] = useState(currentTransmission);
  const [priceRange, setPriceRange] = useState([
    currentMinPrice,
    currentMaxPrice,
  ]);

  const currentFilters = {
    make,
    color,
    bodyType,
    fuelType,
    transmission,
    priceRange,
    priceRangeMin: filters?.priceRange?.min,
    priceRangeMax: filters?.priceRange?.max,
  };

  const handleFilterChange = (filterName: string, value: any) => {
    switch (filterName) {
      case "make":
        setMake(value);
        break;
      case "color":
        setColor(value);
        break;
      case "bodyType":
        setBodyType(value);
        break;
      case "fuelType":
        setFuelType(value);
        break;
      case "transmission":
        setTransmission(value);
        break;
      case "priceRange":
        setPriceRange(value);
        break;
    }
  };

  const handleClearFilter = (filterName: string, value: any) => {
    handleFilterChange(filterName, value ?? "");
  };

  // handler to apply selected filters

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (make) params.set("make", make);
    if (color) params.set("color", color);
    if (bodyType) params.set("bodyType", bodyType);
    if (fuelType) params.set("fuelType", fuelType);
    if (transmission) params.set("transmission", transmission);
    if (priceRange[0] > filters.priceRange.min)
      params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < filters.priceRange.max)
      params.set("maxPrice", priceRange[1].toString());

    // Preserve search and page params if they exist
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    if (search) params.set("search", search);
    if (page && page !== "1") params.set("page", page);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.push(url);
  }, [
    make,
    color,
    bodyType,
    fuelType,
    transmission,
    priceRange,
    pathname,
    searchParams,
    filters?.priceRange?.min,
    filters?.priceRange?.max,
  ]);

  // clear all filters

  const clearFilters = () => {
    setMake("");
    setColor("");
    setBodyType("");
    setFuelType("");
    setTransmission("");
    setPriceRange([filters.priceRange.min, filters.priceRange.max]);

    // Keep search term if exists
    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) params.set("search", search);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.push(url);
  };

  return (
    <div className="w-full h-fit border-[1px] overflow-hidden border-gray-300 rounded-xl">
      {/*filter title and All clear button */}
      <div className="p-4 py-2 bg-gray-100 border-b-[1px] text-gray-600 border-gray-200 flex justify-between items-center">
        <p className="flex items-center gap-1">
          <Filter size={16} />
          Filters
        </p>
        <button
          onClick={clearFilters}
          className="inline-flex cursor-pointer items-center gap-1"
        >
          <X size={16} />
          Clear All
        </button>
      </div>
      {/* filters sections */}
      <FilterControls
        filters={filters}
        currentFilters={currentFilters}
        onFilterChange={handleFilterChange}
        onClearFilter={handleClearFilter}
      />
      <div className="px-4 py-4 border-t">
        <Button onClick={applyFilters} className="w-full cursor-pointer">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default CarFilters;
