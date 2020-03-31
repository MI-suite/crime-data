import Agenda from 'agenda';
import { Service } from 'typedi';

import { Mongo } from '../database/mongoDB';
import { SIGTERM, SIGINT, AGENDA_DB_NAME } from '../settings';

@Service()
export class AgendaScheduler {
    public agenda: Agenda;
    private mongoInstance: Mongo;

    public constructor (mongoInstance: Mongo) {
        this.mongoInstance = mongoInstance;
        this.agenda = new Agenda({
            mongo: this.mongoInstance.client.db(AGENDA_DB_NAME),
        });

        this.bindListeners();
        this.handleGracefulShutdown();
    }

    private bindListeners = (): void => {
        const START = 'start';
        const COMPLETE = 'complete';
        const READY = 'ready';

        this.agenda.on(READY, async () => {
            console.log('AgendaScheduler:::bindListeners: Agenda initialized');
        });

        this.agenda.on(START, (job) => {
            console.log('AgendaScheduler:::JOBS: %s starting', job.attrs.name);
        });

        this.agenda.on(COMPLETE, (job) => {
            console.log('AgendaScheduler:::JOBS: %s finished', job.attrs.name);
        });
    };

    private handleShutdown = (): void => {
        this.agenda.stop();

        console.log('AgendaScheduler:::handleShutdown: Agenda jobs shutdown');
    };

    private handleGracefulShutdown = (): void => {
        process.on(SIGTERM, () => {
            this.handleShutdown();
        });

        process.on(SIGINT, () => {
            this.handleShutdown();
        });
    };
}
