import db from "@/lib/db";
import Car from "@/model/Car";

export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const car = await Car.findById(id).populate("creator")

        return new Response(JSON.stringify(car), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}