import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const AppointmentSchema = new Schema({
    doctor: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    note: {
        type: String,
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',

    },
    time: {
        type: Date,
        required: true,
    },
}, {
    collection: 'appointments',
    timestamps: true,
});

const AppointmentDao = model('Appointment', AppointmentSchema);

export default AppointmentDao;
