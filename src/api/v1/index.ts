
import { Router } from "express";

import platoRoutes from "../../modules/platos/plato.routes";
import ingredienteRoutes from "../../modules/ingredientes/ingrediente.routes";
import clienteRoutes from "../../modules/clientes/cliente.routes";
import categoriaRoutes from "../../modules/categorias/categoria.routes";

const router = Router();

router.use("/plato", platoRoutes);
router.use("/ingrediente", ingredienteRoutes);
router.use("/cliente", clienteRoutes);
router.use("/categoria", categoriaRoutes);

export default router;