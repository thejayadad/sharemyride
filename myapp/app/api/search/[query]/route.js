import db from "@/lib/db";
import Car from "@/model/Car";

export async function GET(req) {
  await db.connect();

  try {
    const { carSeats, price, type } = req.query;

    const query = {};

    if (carSeats) {
      query.carSeats = { $gte: parseInt(carSeats, 10) }; 
    }
    if (price) {
      query.price = { $lte: parseInt(price, 10) }; 
    }
    if (type) {
      query.type = type;
    }

    console.log(query);
    const cars = await Car.find(query);
    

    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  } finally {
    await db.disconnect();
  }
}
