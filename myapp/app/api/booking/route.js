import db from "@/lib/db";
import Booking from "@/model/Booking";

export async function GET(req) {
    await db.connect()

    try {
        const bookings = await Booking.find({}).populate("car")
        return new Response(JSON.stringify(bookings), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function POST(req) {
    await db.connect()

    try {
        const body = await req.json()
        const newBooking = await Booking.create(body)

        return new Response(JSON.stringify(newBooking), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}