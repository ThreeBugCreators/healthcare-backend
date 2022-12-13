import BaseMongooseRepository from '../../../common/base/mongoose-repository.js';
import UserDao from '../schemas/user.js';
import TokenDao from '../schemas/token.js';
import RoomDao from '../schemas/room.js';
import DoctorInfoDao from '../schemas/doctor-info.js';
import MessageDao from '../schemas/message.js';
import AppointmentDao from '../schemas/appointment.js';
import SurveyDao from '../schemas/survey.js';

let userRepository;
let tokenRepository;
let roomRepository;
let doctorInfoRepository;
let messageRepository;
let appointmentRepository;
let surveyRepository;

const MongooseRepositoriesContainer = {
    get() {
        return {
            userRepository,
            tokenRepository,
            roomRepository,
            doctorInfoRepository,
            messageRepository,
            appointmentRepository,
            surveyRepository,
        };
    },
    init() {
        if (!userRepository) {
            userRepository = new BaseMongooseRepository(UserDao);
            tokenRepository = new BaseMongooseRepository(TokenDao);
            roomRepository = new BaseMongooseRepository(RoomDao);
            doctorInfoRepository = new BaseMongooseRepository(DoctorInfoDao);
            messageRepository = new BaseMongooseRepository(MessageDao);
            appointmentRepository = new BaseMongooseRepository(AppointmentDao);
            surveyRepository = new BaseMongooseRepository(SurveyDao);
        }

        return this;
    },
};

export default MongooseRepositoriesContainer;
