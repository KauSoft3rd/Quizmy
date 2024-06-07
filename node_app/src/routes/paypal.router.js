import express from "express";
import asyncHandler from 'express-async-handler';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";
import { getSaying } from "../controllers/home.controller.js";
import { paypalCheckout, paypalCheckoutSuccess } from "../controllers/paypal.controller.js";

export const paypalRouter = express.Router();

paypalRouter.post("/checkout", kakaoIdToUserIdMiddleware, asyncHandler(paypalCheckout));

paypalRouter.get("/checkout/success", asyncHandler(paypalCheckoutSuccess));