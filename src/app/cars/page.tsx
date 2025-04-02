"use client";

import React, { useCallback, useEffect, useState } from "react";
import CarFilters from "./_components/car_filters";
import CarListing from "./_components/car_listing";
import CarFiltersLoading from "./_components/car_filtersloding";
// import data from "../../../data/cars.json";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    makes: [],
    colors: [],
    bodyTypes: [],
    fuelTypes: [],
    transmissions: [],
    priceRange: { min: 0, max: 100000 },
  });

  const fetch_data = useCallback(async () => {
    setLoading(true);
    try {
      const carsConfig = await fetch("/api/cars/configs");
      const configs = await carsConfig.json();
      setFilters(configs);
    } catch (error: any) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  //   const post_data = useCallback(async () => {
  //     try {
  //       const carsConfig = await fetch("/api/cars", {
  //         method: "POST",
  //         body: JSON.stringify(data),
  //       });
  //       const configs = await carsConfig.json();
  //     } catch (error: any) {
  //       console.log("error", error.message);
  //     }
  //   }, []);

  useEffect(() => {
    // fetch filters
    fetch_data();

    // post_data();
  }, []);

  return (
    <div className="min-h-screen p-2 flex gap-4">
      {/* car filters */}
      <div className="w-78 h-fit sticky top-2">
        {loading ? <CarFiltersLoading /> : <CarFilters filters={filters} />}
      </div>
      {/* car listing & pagination */}
      <div className="flex-1">
        <CarListing />
      </div>
    </div>
  );
};

export default page;
