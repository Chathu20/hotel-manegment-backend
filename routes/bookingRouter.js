import express from "express"
import getAllBookings, { createBooking, createBookingUsingCategory, retrieveBookingByDate } from "../controllers/bookingController.js"

const bookingRouter = express.Router()

bookingRouter.post("/", createBooking)

bookingRouter.get("/",getAllBookings)

bookingRouter.post("/filter-date", retrieveBookingByDate)

bookingRouter.post("/create-by-category", createBookingUsingCategory)

export default bookingRouter