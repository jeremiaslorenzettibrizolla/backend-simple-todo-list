import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import ProjectRoutes from '../../features/scraps/presentation/routes/routes';
import ProjectsRateRoutes from '../../features/projects_rate/presentation/routes/routes';
import TaskRoutes from '../../features/tasks/presentation/routes/routes';

export default class App {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    public get server(): express.Application {
        return this.#express;
    }

    public init() {
        this.config();
        this.middlewares();
        this.routes();
    }

    private config() {
        this.#express.use(express.urlencoded({extended: false}));
        this.#express.use(express.json());
        this.#express.use(cors());
    }

    private middlewares() {
        // TODO
    }

    private routes() {
        const router = Router();

        this.#express.get('/', (_: Request, response: Response) => response.redirect('/api'));
        this.#express.use('/api', router);

        router.get('/', (_: Request, response: Response) => response.send('API rodando...'));

        new ProjectRoutes().init(router);
        new ProjectsRateRoutes().init(router);
        new TaskRoutes().init(router);
    }

    /* istanbul ignore next */
    public start(port: number) {
        this.#express.listen(port, () => {
            console.log('API rodando...');
        });
    }
}