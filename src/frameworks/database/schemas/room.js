import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const RoomSchema = new Schema({
    roomProfilePicture: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    users: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        },
    ],
}, {
    collection: 'rooms',
    timestamps: true,
});

const RoomDao = model('Room', RoomSchema);

export default RoomDao;
