import db from "@/lib/db";
import Booking from "@/model/Booking"
import { getSession } from "next-auth/react";

export async function GET(req, ctx) {
    await db.connect();
  
    try {
      const session = await getSession({ req });
    //   if (!session) {
    //     return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    //   }
  
      const userId = ctx.params.id;
      const bookings = await Booking.find({ 'creator': userId })
      return new Response(JSON.stringify(bookings), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify(null), { status: 500 });
    }
  }