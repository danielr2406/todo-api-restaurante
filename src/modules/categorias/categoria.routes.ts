import { Router } from "express";
import { CategoriaController } from "./categoria.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();
const controller = new CategoriaController();

router.post("/", asyncHandler(controller.create));
router.get("/", asyncHandler(controller.findAll));
router.get("/:id", asyncHandler(controller.findById));
router.put("/:id", asyncHandler(controller.update));
router.delete("/:id", asyncHandler(controller.delete));

export default router;