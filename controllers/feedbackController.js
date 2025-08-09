import Feedback from "../models/feedback.js";
import { isAdminValid } from "./userControllers.js";

//-------------Add new Feedback----------------
export function createFeedback(req, res){
    if(req.body.user == null){
        res.status(401).json({
            message: "Unauthorized"
        })
        return
    }
    if(req.body.user.type != "Customer"){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }
    const newFeedback = new Feedback(req.body)
    newFeedback.save().then(
        (result)=>{
            res.json({
                message: "Feedback created successfully",
                result: result
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message: "Feedback Creation failed",
                error: err
            })
        }
    )
}

//------------------Show all Feedbacks-------------------
export function getFeedback(req, res){
    Feedback.find().then(
        (result)=>{
            res.json({
                Feedbacks: result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Failed to get Feedbacks"
            })
        }
    )
}

//-------------------Update Room-----------------------
export function updateFeedback(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }

    const feedbackId = req.params.feedback_ID
    Feedback.findOneAndUpdate({
        feedback_ID: feedbackId
    },req.body).then(
        ()=>{
            res.json({
                message: "Feedback updated successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Feedback update failed"
            })
        }
    )
}