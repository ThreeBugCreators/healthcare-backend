import mongooseUniqueValidator from 'mongoose-unique-validator';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
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
}, {
    collection: 'users',
    timestamps: true,
});

UserSchema.index({ name: 1 });

UserSchema.plugin(mongooseUniqueValidator);

const UserDao = model('User', UserSchema);

export default UserDao;
