import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    expired: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    collection: 'tokens',
});

const TokenDao = mongoose.model('Token', TokenSchema);

export default TokenDao;
