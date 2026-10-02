import { Request, Response } from "express";
import { ClienteService } from "./cliente.service";

export class ClienteController {

    private readonly clienteService =
        new ClienteService();

    create = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const cliente =
            await this.clienteService.create(
                req.body
            );

        res.status(201).json(cliente);
    };

    findAll = async (
        _req: Request,
        res: Response
    ): Promise<void> => {

        const clientes =
            await this.clienteService.findAll();

        res.status(200).json(clientes);
    };

    findById = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {

        const cliente =
            await this.clienteService.findById(
                req.params.id
            );

        res.status(200).json(cliente);
    };

    update = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {

        const cliente =
            await this.clienteService.update(
                req.params.id,
                req.body
            );

        res.status(200).json(cliente);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {

        await this.clienteService.delete(
            req.params.id
        );

        res.status(204).send();
    };
}