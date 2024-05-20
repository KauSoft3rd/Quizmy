import express from "express";
import asyncHandler from 'express-async-handler';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";
import { getSaying } from "../controllers/home.controller.js";

export const homeRouter = express.Router();

homeRouter.get("/saying", asyncHandler(getSaying));
