"use client";

import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { useRouter, useSearchParams } from "next/navigation";
import CarListingLoading from "./car_listingloading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Car_card from "./Card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AnimatePresence, motion } from "motion/react";
import { easeIn } from "motion";

interface Car {
  _id: string;
  make: string;
  model: string;
  bodyType: string;
  fuelType: string;
  color: string;
  engine: string;
  image: string;
  mileage: number;
  price: number;
  transmission: string;
  createdAt: string;
  updatedAt: string;
}

const CarListing = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const page = parseInt(searchParams.get("page") || "1");
  const { fn, data, loading, error }: any = useFetch();

  useEffect(() => {
    const params = new URLSearchParams();
    const queryParams = [
      "search",
      "make",
      "color",
      "bodyType",
      "fuelType",
      "transmission",
      "minPrice",
      "maxPrice",
      "sortBy",
      "page",
    ];

    queryParams.forEach((param) => {
      if (searchParams.has(param)) {
        params.append(param, searchParams.get(param)!);
      }
    });
    fn(`/api/cars?${params.toString()}`);
  }, [searchParams]);

  useEffect(() => {
    if (currentPage !== page) {
      const params = new URLSearchParams();
      params.set("page", currentPage.toString());
      router.push(`?${params.toString()}`);
    }
  }, [currentPage]);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  // Generate pagination items
  let paginationItems: [] | React.ReactNode[] = [];

  paginationItems = Array(data?.pages)
    .fill("")
    .map((_, i) => {
      return (
        <PaginationItem key={i + 1}>
          <PaginationLink
            isActive={i + 1 === page}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i + 1);
            }}
          >
            {i + 1}
          </PaginationLink>
          {/* <PaginationEllipsis /> */}
        </PaginationItem>
      );
    });

  if (loading && !data) {
    return <CarListingLoading />;
  }

  if (error) {
    return (
      <Alert variant={"destructive"}>
        <Info className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load cars. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (data?.cars?.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-gray-50">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <Info className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">No cars found</h3>
        <p className="text-gray-500 mb-6 max-w-md">
          We couldn't find any cars matching your search criteria. Try adjusting
          your filters or search term.
        </p>
        <Button variant="outline" asChild>
          <Link href="/cars">Clear all filters</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {data?.cars.length &&
            data?.cars?.map((car: Car, i: number) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.1, delay: i / 10 },
                  }}
                  // transition={{ duration: 0.1, delay: i / 10 }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                >
                  <Car_card car={car} key={i} />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
      {/* shadcn pagination */}
      {data?.pages > 1 && (
        <Pagination className="mt-10 flex ">
          <PaginationContent className="cursor-pointer">
            <PaginationItem>
              <PaginationPrevious
                // href={getPaginationUrl(page - 1)}
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) {
                    handlePageChange(page - 1);
                  }
                }}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {paginationItems}

            <PaginationItem>
              <PaginationNext
                // href={getPaginationUrl(page + 1)}
                onClick={(e) => {
                  e.preventDefault();
                  if (page < data.pages) {
                    handlePageChange(page + 1);
                  }
                }}
                className={
                  page >= data.pages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CarListing;
