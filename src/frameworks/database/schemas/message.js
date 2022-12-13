import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const MessageSchema = new Schema({
    room: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    from: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    content: {
        type: String,
    },
    attachements: {
        type: mongoose.SchemaTypes.Mixed,
    },
}, {
    collection: 'messages',
    timestamps: true,
});

const MessageDao = model('Message', MessageSchema);

export default MessageDao;
