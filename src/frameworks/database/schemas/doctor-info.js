import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const DoctorInfoSchema = new Schema({
    doctorId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    specialists: [{
        name: String,
        vote: {
            type: Number,
            default: 0,
        },
    }],
    likeReceived: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    hospital: {
        type: String,
    },
    city: {
        type: String,
    },
    department: {
        type: String,
    },
}, {
    collection: 'doctor-info',
    timestamps: true,
});

const DoctorInfoDao = model('DoctorInfo', DoctorInfoSchema);

export default DoctorInfoDao;
