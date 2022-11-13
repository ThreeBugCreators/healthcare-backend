import BaseRepository from './base-repository.js';
import { ActiveStatus } from '../constants/index.js';

const findOperationBaseOptions = {
    isLean: true,
    populate: [],
    fields: '',
    sort: '',
    where: {
        isActive: ActiveStatus.Active,
    },
};

class BaseMongooseRepository extends BaseRepository {
    constructor(model) {
        super();
        this.model = model;
    }

    create(data) {
        if (Array.isArray(data)) {
            return this.model.insertMany(data);
        }

        return this.model.create(data);
    }

    findOne(options) {
        const optimizedOptions = Object.assign(findOperationBaseOptions, options);
        return this.model
            .findOne({
                ...optimizedOptions.where,
                isActive: ActiveStatus.Active,
            })
            .sort(optimizedOptions.sort)
            .populate(optimizedOptions.populate)
            .select(optimizedOptions.fields)
            .lean(optimizedOptions.isLean || true);
    }

    find(options) {
        const optimizedOptions = Object.assign(findOperationBaseOptions, options);
        return this.model
            .find({
                ...optimizedOptions.where,
                isActive: ActiveStatus.Active,
            })
            .sort(optimizedOptions.sort)
            .populate(optimizedOptions.populate)
            .select(optimizedOptions.fields)
            .lean(optimizedOptions.isLean || true);
    }

    updateOne(options) {
        const optimizedOptions = {
            where: {
                isActive: ActiveStatus.Active,
                ...options.where,
            },
            data: options.data,
            options: {
                new: true,
                ...options.options,
            },
        };

        return this.model
            .updateOne(
                optimizedOptions.where,
                optimizedOptions.data,
                optimizedOptions.options,
            );
    }

    updateMany(options) {
        const optimizedOptions = {
            where: {
                isActive: ActiveStatus.Active,
                ...options.where,
            },
            data: options.data,
            options: {
                new: true,
                ...options.options,
            },
        };
        return this.model
            .updateMany(
                optimizedOptions.where,
                optimizedOptions.data,
                optimizedOptions.options,
            );
    }

    deleteOne(data) {
        return this.model
            .updateOne(
                data.where, {
                    isActive: ActiveStatus.Inactive,
                },
            );
    }
}

export default BaseMongooseRepository;
