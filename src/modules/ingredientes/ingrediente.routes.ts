import { Router } from "express";

import { IngredienteController } from "./ingrediente.controller";

import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();

const ingredienteController =
    new IngredienteController();

router.post(
    "/",
    asyncHandler(ingredienteController.create)
);

router.get(
    "/",
    asyncHandler(ingredienteController.findAll)
);

router.get(
    "/:id",
    asyncHandler(ingredienteController.findById)
);

router.put(
    "/:id",
    asyncHandler(ingredienteController.update)
);

router.delete(
    "/:id",
    asyncHandler(ingredienteController.delete)
);

export default router;