import { Router } from "express";

import { ClienteController } from "./cliente.controller";

import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();

const clienteController =
    new ClienteController();

router.post(
    "/",
    asyncHandler(clienteController.create)
);

router.get(
    "/",
    asyncHandler(clienteController.findAll)
);

router.get(
    "/:id",
    asyncHandler(clienteController.findById)
);

router.put(
    "/:id",
    asyncHandler(clienteController.update)
);

router.delete(
    "/:id",
    asyncHandler(clienteController.delete)
);

export default router;