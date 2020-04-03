import { Controller, Get } from 'routing-controllers';
import { Container } from 'typedi';

import { Redis } from '../cache/redis';
import { Mongo } from '../database/mongoDB/index';
import { PG } from '../database/postgresql';
import { AgendaScheduler } from '../jobs_manager/Agenda';

@Controller('/health')
export class HealthCheck {
    @Get('/')
    public async get (): Promise<any> {
        Container.get(AgendaScheduler);
        Container.get(Mongo);
        Container.get(PG);
        Container.get(Redis);

        return true;
    }
}
