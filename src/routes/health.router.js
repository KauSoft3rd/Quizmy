import express from "express";
import { healthController } from "../controllers/health.controller.js";

export const healthRoute = express.Router();

healthRoute.get('', healthController);