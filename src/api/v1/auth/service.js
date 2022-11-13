import logger from '../../../common/logging/index.js';
import Hasher from '../../../common/utils/password-hashing.js';
import JwtHelper from '../../../common/utils/jwt.js';
import Mapper from '../../../frameworks/database/mapper/index.js';
import ErrorMessage from '../../../common/utils/http-error.js';

class AuthService {
    constructor({ userRepository, tokenRepository, redisClient }) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.redisClient = redisClient;
    }

}

export default AuthService;
