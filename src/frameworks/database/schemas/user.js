import mongooseUniqueValidator from 'mongoose-unique-validator';
import mongoose from 'mongoose';

import { Roles } from '../../../common/constants/index.js';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: Roles.User,
        enum: Object.values(Roles),
    },
    created: Date,
});

UserSchema.index({ name: 1 });

UserSchema.index({ name: 1, created: -1 });

UserSchema.plugin(mongooseUniqueValidator);

const UserDao = model('User', UserSchema);

export default UserDao;
