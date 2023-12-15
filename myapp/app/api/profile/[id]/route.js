import db from "@/lib/db";
import User from "@/model/User"
import Car from "@/model/Car";

export const GET = async (request, { params }) => {
    db.connect()
    try {
        const car = await Car.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(car), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 