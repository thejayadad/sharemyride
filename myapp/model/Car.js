import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    address: String,
    photos: [String],
 
    desc: String,
    extraInfo: String,
    availableStart: Number,
    availableSFinish: Number,
    carSeats: Number,
    price: Number,
    type: {
        type: String,
        enum: ["sedan", "suv", "luxury", "sports", "truck", "van"],
        default: "sedan",
      },
}, {timestamps: true})

export default mongoose?.models?.Car || mongoose.model("Car", CarSchema)