import BaseRepository from './base-repository.js';

class BaseKnexRepository extends BaseRepository {
    constructor(knexConnection, tableName) {
        super();
        this.connection = knexConnection;
        this.tableName = tableName;
    }

    initQuery() {
        return this.connection(this.tableName).clone();
    }

    create(data) {
        return this.initQuery().insert(data);
    }

    async findOne(options) {
        const data = await this.initQuery()
            .where(options.where)
            .select('*');

        if (Array.isArray(data) && data.length) {
            return data[0];
        }

        return null;
    }
}

export default BaseKnexRepository;
