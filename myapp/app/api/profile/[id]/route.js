import db from "@/lib/db";
import User from "@/model/User"

export const GET = async (request, { params }) => {
    db.connect()
    try {
        const user = await User.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 