import express from "express";
import { createFeedback, getFeedback, updateFeedback } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router()

feedbackRouter.post("/", createFeedback)

feedbackRouter.get("/", getFeedback)

feedbackRouter.put("/:feedback_ID", updateFeedback)

export default feedbackRouter;