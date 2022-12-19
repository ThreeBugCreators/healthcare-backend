import BaseMongooseRepository from '../../../common/base/mongoose-repository.js';
import UserDao from '../schemas/user.js';
import TokenDao from '../schemas/token.js';

let userRepository;
let tokenRepository;

const MongooseRepositoriesContainer = {
    get() {
        return {
            userRepository,
            tokenRepository,
        };
    },
    init() {
        if (!userRepository) {
            userRepository = new BaseMongooseRepository(UserDao);
            tokenRepository = new BaseMongooseRepository(TokenDao);
        }

        return this;
    },
};

export default MongooseRepositoriesContainer;
