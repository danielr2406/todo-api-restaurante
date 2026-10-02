import { Router } from "express";
import { PlatoController } from "./plato.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();

const platoController = new PlatoController();

router.post("/", asyncHandler(platoController.create));

router.get("/", asyncHandler(platoController.findAll));

router.get("/:id", asyncHandler(platoController.findById));

router.put("/:id", asyncHandler(platoController.update));

router.delete("/:id", asyncHandler(platoController.delete));

export default router;