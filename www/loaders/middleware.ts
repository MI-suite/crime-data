import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import {
    useContainer as routingUseContainer,
    useExpressServer as routingUseExpressServer,
} from 'routing-controllers';
import { Container } from 'typedi';

import { HealthCheck } from '../../controllers/HealthCheck';

const API_VERSION = '/api/v1';

export const app = express();

app.use(cors());

app.use(helmet());

routingUseContainer(Container);

routingUseExpressServer(app, {
    routePrefix: API_VERSION,
    controllers: [
        HealthCheck,
    ],
});
