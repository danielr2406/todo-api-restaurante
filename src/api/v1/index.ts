import { Router } from "express";

import platoRoutes from "../../modules/platos/plato.routes";

import ingredienteRoutes from "../../modules/ingredientes/ingrediente.routes";

import clienteRoutes from "../../modules/clientes/cliente.routes";

const router = Router();

router.use("/plato", platoRoutes);

router.use("/ingrediente", ingredienteRoutes);           

router.use("/cliente", clienteRoutes);

export default router;      