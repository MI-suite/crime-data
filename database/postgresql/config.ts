import {
    PG_PASSWORD,
    PG_HOST,
    PG_USER,
    PG_PORT,
    PG_NAME,
    NODE_ENV,
    PROD_PG_URL,
    PG_TEST_DB_NAME,
} from '../../env/index';
import { PRODUCTION, TEST } from '../../settings';

interface IDBConfig {
    connectionString: string;
}

const BASE_URL: string =
    `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}`;

export const config: IDBConfig = {
    connectionString: `${BASE_URL}/${PG_NAME}`,
};

if (NODE_ENV.match(PRODUCTION)) {
    config.connectionString = PROD_PG_URL;
}

if (NODE_ENV.match(TEST)) {
    config.connectionString = `${BASE_URL}${PG_TEST_DB_NAME}`;
}
