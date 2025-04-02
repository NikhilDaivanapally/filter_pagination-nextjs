import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Car from "../../../../lib/model/car";

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const make = searchParams.get("make");
    const color = searchParams.get("color");
    const bodyType = searchParams.get("bodyType");
    const fuelType = searchParams.get("fuelType");
    const transmission = searchParams.get("transmission");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const page = parseInt(searchParams.get("page")!) || 1;
    const limit = parseInt(searchParams.get("limit")!) || 6;

    // Buildlin the query condition dynamically
    const condition: any = {};
    if (make) condition.make = make;
    if (color) condition.color = color;
    if (bodyType) condition.bodyType = bodyType;
    if (fuelType) condition.fuelType = fuelType;
    if (transmission) condition.transmission = transmission;
    if (minPrice)
      condition.price = { ...condition.price, $gte: parseInt(minPrice) };
    if (maxPrice)
      condition.price = { ...condition.price, $lte: parseInt(maxPrice) };

    const cars = await Car.find(condition)
      .skip((page - 1) * limit)
      .limit(limit);
    const totalCount = await Car.countDocuments(condition);
    const response = {
      cars,
      totalCount,
      pages: Math.ceil(totalCount / limit),
    };
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching cars: " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDB();
    const body = await request.json();
    let cars;
    if (Array.isArray(body)) {
      cars = await Car.insertMany(body);
      return new NextResponse(
        JSON.stringify({ message: "Cars are created", cars: cars }),
        { status: 200 }
      );
    } else {
      cars = new Car(body);
      await cars.save();
      return new NextResponse(
        JSON.stringify({ message: "Car is  created", cars: cars }),
        { status: 200 }
      );
    }
  } catch (error: any) {
    return new NextResponse("Error in creating cars" + error.message, {
      status: 500,
    });
  }
};
