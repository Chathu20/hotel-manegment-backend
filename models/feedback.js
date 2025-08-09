import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
    {
        feedback_ID: {
            type: Number,
            required: true,
            unique: true
        },
        guest_Name: {
            type: String,
            required: true
        },
        room_Number: {
            type: Number,
            default: ""
        },
        feedback_type: {
            type: String,
            default: ""
        },
        rating: {
            type: Number,
            required: true
        },
        comments: {
            type: String,
            default: ""
        },
        date: {
            type: Date,
            required: true
        },
        response: {
            type: String,
            default: "Expect response soon"
        },
        approval: {
            type: Boolean,
            default: false
        }
    }
)

const Feedback = mongoose.model("Feedbacks", feedbackSchema)

export default Feedback;