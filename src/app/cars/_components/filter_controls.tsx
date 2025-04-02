import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Check, X } from "lucide-react";
import React from "react";

type filter = {
  makes: string[];
  colors: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  priceRange: { min: number; max: number };
};
type currentfilters = {
  make: string;
  color: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  priceRange: number[];
  priceRangeMin: number;
  priceRangeMax: number;
};

type filterControlProps = {
  filters: filter;
  currentFilters: currentfilters;
  onFilterChange: (filterName: string, value: any) => void;
  onClearFilter: (filterName: string, value?: any) => void;
};

const FilterControls = ({
  filters,
  currentFilters,
  onFilterChange,
  onClearFilter,
}: filterControlProps) => {
  const { make, color, bodyType, fuelType, transmission, priceRange } =
    currentFilters;

  const filterSections = [
    {
      id: "make",
      title: "Make",
      options: filters?.makes?.map((make: string) => ({
        value: make,
        label: make,
      })),
      currentValue: make,
      onChange: (value: string) => onFilterChange("make", value),
    },
    {
      id: "color",
      title: "Color",
      options: filters?.colors?.map((color: string) => ({
        value: color,
        label: color,
      })),
      currentValue: color,
      onChange: (value: string) => onFilterChange("color", value),
    },
    {
      id: "bodyType",
      title: "Body Type",
      options: filters?.bodyTypes?.map((type: string) => ({
        value: type,
        label: type,
      })),
      currentValue: bodyType,
      onChange: (value: string) => onFilterChange("bodyType", value),
    },
    {
      id: "fuelType",
      title: "Fuel Type",
      options: filters?.fuelTypes?.map((type: string) => ({
        value: type,
        label: type,
      })),
      currentValue: fuelType,
      onChange: (value: string) => onFilterChange("fuelType", value),
    },
    {
      id: "transmission",
      title: "Transmission",
      options: filters?.transmissions?.map((type: string) => ({
        value: type,
        label: type,
      })),
      currentValue: transmission,
      onChange: (value: string) => onFilterChange("transmission", value),
    },
  ];

  return (
    <div className="w-full p-4">
      <div className="">
        <Slider
          min={filters?.priceRange.min}
          max={filters?.priceRange.max}
          step={100}
          value={priceRange}
          className="cursor-pointer"
          onValueChange={(value) => onFilterChange("priceRange", value)}
        />
        <div className="flex items-center justify-between my-1">
          <div className="font-medium text-sm">${priceRange[0]}</div>
          <div className="font-medium text-sm">${priceRange[1]}</div>
        </div>
      </div>
      {/* Filter Categories */}
      {filterSections?.map((section) => (
        <div key={section.id} className="space-y-2 mt-2">
          <h4 className="flex justify-between">
            <span className="font-semibold">{section.title}</span>
            {section.currentValue && (
              <button
                className="text-xs cursor-pointer text-gray-600 flex items-center"
                onClick={() => onClearFilter(section.id)}
              >
                <Badge variant={"outline"}>
                  <X className="mr-1 h-3 w-3" />
                  clear
                </Badge>
              </button>
            )}
          </h4>

          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1">
            {section?.options?.map((option) => {
              return (
                <button
                  key={option.value}
                  className="rounded-lg focus-visible:bg-gray-100"
                  onClick={() => {
                    section.onChange(
                      section.currentValue == option.value ? "" : option.value
                    );
                  }}
                >
                  <Badge
                    variant={
                      section.currentValue === option.value
                        ? "default"
                        : "outline"
                    }
                    className={`cursor-pointer px-3 py-1 ${
                      section.currentValue === option.value
                        ? "bg-blue-100 hover:bg-blue-200 text-blue-900 border-blue-200"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {option.label}
                    {section.currentValue == option.value && (
                      <Check className="ml-1 h-3 w-3 inline" />
                    )}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterControls;
