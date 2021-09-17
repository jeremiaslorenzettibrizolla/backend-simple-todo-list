import 'reflect-metadata';
import dotenv from 'dotenv';

import { Database } from './core/infra/data/connections/database';
import App from './core/presentation/app';

dotenv.config({
    path: './../.env',
});

new Database()
    .openConnection()
    .then((_) => {
        const app = new App();
        const port = process.env.PORT || '8080';

        app.init();
        app.start(parseInt(port));
    })
    .catch(console.error);
