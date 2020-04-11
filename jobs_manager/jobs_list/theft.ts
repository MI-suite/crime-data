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
    const LAST_SERIAL_NUMBER_KEY = `LAST_SERIAL_NUMBER_KEY:::${THEFT_JOB}`;
    const MODEL = 'crimes.all';
    const CASE_TYPE = 'THEFT';
    const KAFKA_TOPIC = KAFKA_THEFT_TOPIC;
    const LIMIT = 2000;
    const lastSerialNumber =
        await redisInstance.getDataFromRedis(LAST_SERIAL_NUMBER_KEY) || 0;

    const data = await crimeService.getCrimeDataByType({
        model: MODEL,
        limit: LIMIT,
        caseType: CASE_TYPE,
        lastSN: lastSerialNumber,
    });

    if (!data || !data.length) {
        return;
    }

    await pubsub.publish({
        topic: KAFKA_TOPIC,
        message: data,
    });

    redisInstance.addDataToRedis(LAST_SERIAL_NUMBER_KEY, data[data.length - 1].SN);
});

agendaInstance.agenda.start();
agendaInstance.agenda.every('10 seconds', THEFT_JOB);
