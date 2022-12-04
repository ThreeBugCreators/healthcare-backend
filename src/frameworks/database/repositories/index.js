import BaseMongooseRepository from '../../../common/base/mongoose-repository.js';
import UserDao from '../schemas/user.js';
import TokenDao from '../schemas/token.js';
import DoctorInfoDao from '../schemas/doctor-info.js';

let userRepository;
let tokenRepository;
let doctorInfoRepository;

const MongooseRepositoriesContainer = {
    get() {
        return {
            userRepository,
            tokenRepository,
            doctorInfoRepository,
        };
    },
    init() {
        if (!userRepository) {
            userRepository = new BaseMongooseRepository(UserDao);
            tokenRepository = new BaseMongooseRepository(TokenDao);
            doctorInfoRepository = new BaseMongooseRepository(DoctorInfoDao);
        }

        return this;
    },
};

export default MongooseRepositoriesContainer;
