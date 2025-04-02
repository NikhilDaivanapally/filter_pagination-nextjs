import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Car from "../../../../../lib/model/car";

export const GET = async () => {
  try {
    await connectDB();

    // Fetch distinct values for each filter category
    const makes = await Car.distinct("make");
    const colors = await Car.distinct("color");
    const fuelTypes = await Car.distinct("fuelType");
    const bodyTypes = await Car.distinct("bodyType");
    const transmissions = await Car.distinct("transmission");
    // Calculate min and max price
    const minPriceObj = await Car.find().sort({ price: 1 }).limit(1);
    const maxPriceObj = await Car.find().sort({ price: -1 }).limit(1);
    const minPrice = minPriceObj.length > 0 ? minPriceObj[0].price : 0;
    const maxPrice = maxPriceObj.length > 0 ? maxPriceObj[0].price : 0;
    // Construct filter configuration
    const filterConfig = {
      makes,
      colors,
      fuelTypes,
      bodyTypes,
      transmissions,
      priceRange: { min: minPrice, max: maxPrice },
    };

    return new NextResponse(JSON.stringify(filterConfig), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      "Error in fetching car configurations" + error.message,
      {
        status: 500,
      }
    );
  }
};
