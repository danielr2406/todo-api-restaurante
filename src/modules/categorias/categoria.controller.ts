
import { Request, Response } from "express";
import { CategoriaService } from "./categoria.service";

export class CategoriaController {

    private service = new CategoriaService();

    create = async (req: Request, res: Response): Promise<void> => {
        const categoria = await this.service.create(req.body);

        res.status(201).json({
            message: "Categoría creada correctamente",
            data: categoria
        });
    };

    findAll = async (_req: Request, res: Response): Promise<void> => {
        const categorias = await this.service.findAll();

        res.status(200).json({
            data: categorias
        });
    };

    findById = async (req: Request, res: Response): Promise<void> => {
        const categoria = await this.service.findById(
            req.params.id as string
        );

        if (!categoria) {
            res.status(404).json({
                message: "Categoría no encontrada"
            });
            return;
        }

        res.status(200).json({
            data: categoria
        });
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const categoria = await this.service.update(
            req.params.id as string,
            req.body
        );

        if (!categoria) {
            res.status(404).json({
                message: "Categoría no encontrada"
            });
            return;
        }

        res.status(200).json({
            message: "Categoría actualizada correctamente",
            data: categoria
        });
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const eliminado = await this.service.delete(
            req.params.id as string
        );

        if (!eliminado) {
            res.status(404).json({
                message: "Categoría no encontrada"
            });
            return;
        }

        res.status(200).json({
            message: "Categoría eliminada correctamente"
        });
    };
}