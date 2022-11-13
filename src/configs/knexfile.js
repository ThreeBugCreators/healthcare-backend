import { join } from 'path';

const knexConfiguration = {
    client: process.env.KNEX_CLIENT || 'pg',
    connection: {
        host: process.env.KNEX_DB_URI || '127.0.0.1',
        port: process.env.KNEX_DB_PORT || '5432',
        user: process.env.KNEX_DB_USER || 'postgres',
        password: process.env.KNEX_DB_PASSWORD || 'postgres',
        database: process.env.KNEX_DB || 'learning',
    },
    migrations: {
        directory: join(process.cwd(), '../frameworks/database/knex/migrations'),
        tableName: 'migrations',
    },
    seeds: {
        directory: join(process.cwd(), '../frameworks/database/knex/seeds'),
    },
};

export default knexConfiguration;
