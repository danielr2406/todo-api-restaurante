    import { Request, Response } from "express";
import { PlatoService } from "./plato.service";

export class PlatoController {

    private readonly platoService = new PlatoService();

    create = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const plato =
            await this.platoService.create(req.body);

        res.status(201).json(plato);
    };

    findAll = async (
        _req: Request,
        res: Response
    ): Promise<void> => {

        const platos =
            await this.platoService.findAll();

        res.status(200).json(platos);
    };

    findById = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {

        const plato =
            await this.platoService.findById(
                req.params.id
            );

        res.status(200).json(plato);
    };

    update = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {

        const plato =
            await this.platoService.update(
                req.params.id,
                req.body
            );

        res.status(200).json(plato);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {

        await this.platoService.delete(
            req.params.id
        );

        res.status(204).send();
    };
}