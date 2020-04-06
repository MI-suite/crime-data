import { Container } from 'typedi';

import { Redis } from '../../cache/redis';
import { KAFKA_THEFT_TOPIC } from '../../env';
import { PubSub } from '../../pubsub';
import { CrimesService } from '../../services/CrimesService';
import { AgendaScheduler } from '../Agenda';
import { THEFT_JOB } from '../constants';

const agendaInstance = Container.get(AgendaScheduler);
const crimeService = Container.get(CrimesService);
const pubsub = Container.get(PubSub);
const redisInstance = Container.get(Redis);

agendaInstance.agenda.define(THEFT_JOB, async () => {
    const KAFKA_TOPIC = KAFKA_THEFT_TOPIC;
    const MODEL = 'chicago_crimes';
    const CASE_TYPE = 'THEFT';
    const LIMIT = 1000;
    const currentOffset = await redisInstance.getDataFromRedis(THEFT_JOB) || 0;
    const newOffset = currentOffset + LIMIT;

    const data = await crimeService.getCrimeData({
        model: MODEL,
        offset: currentOffset,
        limit: LIMIT,
        caseType: CASE_TYPE,
    });

    if (!data || !data.length) {
        return;
    }

    await pubsub.publish({
        topic: KAFKA_TOPIC,
        message: data,
    });

    redisInstance.addDataToRedis(THEFT_JOB, newOffset);
});

agendaInstance.agenda.start();
agendaInstance.agenda.every('10 seconds', THEFT_JOB);
