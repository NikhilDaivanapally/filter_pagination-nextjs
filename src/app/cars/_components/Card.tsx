"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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

const Car_card = ({ car }: { car: Car }) => {
  const router = useRouter();
  return (
    <Card
      key={car._id}
      className="overflow-hidden hover:shadow-lg space-y-3 transition group"
    >
      <div className="relative h-48">
        {car.image ? (
          <div className="relative w-full h-full">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <CarIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex flex-col mb-2">
          <h3 className="text-lg font-bold line-clamp-1">
            {car.make} {car.model}
          </h3>
          <span className="text-xl font-bold text-blue-600">${car.price}</span>
        </div>

        <div className="text-gray-600 mb-2 flex items-center">
          <span>{car.transmission}</span>
          <span className="mx-2">•</span>
          <span>{car.fuelType}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="outline" className="bg-gray-50">
            {car.bodyType}
          </Badge>
          <Badge variant="outline" className="bg-gray-50">
            {car.mileage.toLocaleString()} miles
          </Badge>
        </div>

        <div className="flex justify-between">
          <Button
            className="flex-1 cursor-pointer"
            // onClick={() => {
            //   router.push(`/cars/${car._id}`);
            // }}
          >
            View Car
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Car_card;
