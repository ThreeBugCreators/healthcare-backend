import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const SurveySchema = new Schema({
    serviceRating: {
        type: Number,
    },
    doctorRating: {
        type: Number,
    },
    infrastructureRating: {
        type: Number,
    },
    thoughts: {
        type: String,
    },
    hospital: {
        type: String,
    },
    doctorId: {
        type: SchemaTypes.Mixed,
    },
}, {
    collection: 'surveys',
    timestamps: true,
});

const SurveyDao = model('Survey', SurveySchema);

export default SurveyDao;
