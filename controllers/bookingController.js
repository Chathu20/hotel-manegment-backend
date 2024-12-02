import Booking from "../models/booking.js";
import { isCustomerValid } from "./userControllers.js";

//-------------------New Booking Function--------------------
export function createBooking(req, res){

    if(!isCustomerValid(req)){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }

    const startingId = 1200;

    Booking.countDocuments({}).then(
        (count)=>{
            const newId = startingId + count + 1
            const newBooking = new Booking({
                bookingId: newId,
                roomId: req.body.roomId,
                email: req.user.email,
                start: req.body.start,
                end: req.body.end
            })
            newBooking.save().then(
                (result)=>{
                    res.json({
                        message: "Booking Created Successfully",
                        result: result
                    })
                }
            ).catch(
                (err)=>{
                    res.json({
                        message: "Booking Creation Failed",
                        error: err
                    })
                }
            )
        }
    ).catch(
        (err)=>{
            res.json({
                message: "Booking Creation Failed",
                error: err
            })
        }
    )
}