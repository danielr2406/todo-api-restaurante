import { Request, Response } from "express";
import { IngredienteService } from "./ingrediente.service";

export class IngredienteController {

    private readonly ingredienteService = new IngredienteService();

    create = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const ingrediente =
            await this.ingredienteService.create(req.body);

        res.status(201).json(ingrediente);
    };

    findAll = async (
        _req: Request,
        res: Response
    ): Promise<void> => {

        const ingredientes =
            await this.ingredienteService.findAll();

        res.status(200).json(ingredientes);
    };

    findById = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {

        const ingrediente =
            await this.ingredienteService.findById(
                req.params.id
            );

        res.status(200).json(ingrediente);
    };

    update = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {

        const ingrediente =
            await this.ingredienteService.update(
                req.params.id,
                req.body
            );

        res.status(200).json(ingrediente);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {

        await this.ingredienteService.delete(
            req.params.id
        );

        res.status(204).send();
    };
}