import {
    AGENDA_PROD_DB_NAME, AGENDA_TEST_DB_NAME, AGENDA_DEV_DB_NAME,
    NODE_ENV,
    MONGO_TEST_DB,
    MONGO_DEV_DB,
    MONGO_PROD_DB } from '../env';

import { IEnvironment } from './settings.interface';

// Node events
export const UNHANDLED_REJECTION = 'unhandledRejection';
export const UNCAUGHT_EXCEPTION = 'uncaughtException';
export const SIGTERM = 'SIGTERM';
export const SIGINT = 'SIGINT';

export const AGENDA_DB_ENVIRONMENT: IEnvironment = {
    test: AGENDA_TEST_DB_NAME,
    development: AGENDA_DEV_DB_NAME,
    production: AGENDA_PROD_DB_NAME,
};
export const AGENDA_DB_NAME = AGENDA_DB_ENVIRONMENT[NODE_ENV];

export const MONGO_DB_ENVIRONMENT: IEnvironment = {
    test: MONGO_TEST_DB,
    development: MONGO_DEV_DB,
    production: MONGO_PROD_DB,
};
export const MONGO_URL = MONGO_DB_ENVIRONMENT[NODE_ENV];

export const TEST = 'test';
export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';
