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

    async login({ username, password }) {
        const user = await this.userRepository.findOne({
            where: {
                username,
            },
        });

        if (!user) {
            throw new Error('user_not_existed');
        }

        const isValidPassword = await Hasher.compare(password, user.password);

        if (isValidPassword) {
            const {
                accessToken,
                refreshToken,
            } = JwtHelper.generateToken({
                _id: user._id,
                username: user.username,
                email: user.email,
            });

            await this.tokenRepository.updateMany({
                where: {
                    userId: user._id,
                },
                data: {
                    $set: {
                        expired: true,
                    },
                },
            });

            await this.tokenRepository.create({
                refreshToken,
                accessToken,
                userId: user._id,
            });

            return {
                ...Mapper.toUserDomain(user),
                accessToken,
                refreshToken,
            };
        }

        throw new Error(ErrorMessage.PasswordIsInvalid.key);
    }

    async register(data) {
        const {
            username,
            email,
            password,
            name,
            surname,
        } = data;

        const existedUser = await this.userRepository.findOne({ where: { username } });
        const hashedPassword = await Hasher.hash(password);

        if (existedUser) {
            throw new Error(`User with ${username} existed`);
        }

        return await this.userRepository.create({ username, email, name, surname, password: hashedPassword });
    }

    async refreshAccessToken({ refreshToken, accessToken }) {
        const isAccessTokenAlive = JwtHelper.verifyAccessToken(accessToken);
        if (!isAccessTokenAlive) {
            const isRefreshTokenAlive = JwtHelper.verifyRefreshToken(refreshToken);
            console.log({ isRefreshTokenAlive });
            if (!isRefreshTokenAlive) {
                await this.diasbleUserToken(refreshToken);
                throw new Error('RELOGIN_REQUIRED');
            }

            const storedRefreshToken = await this.getUserToken(refreshToken);
            if (storedRefreshToken) {
                const { userId } = storedRefreshToken;
                const user = await this.userRepository.findOne({ where: { _id: userId } });
                const { username, email, _id } = user;
                const newAccessToken = JwtHelper.generateAccessToken({ username, email, _id });
                return newAccessToken;
            }

            throw new Error('INVALID_REFRESH_TOKEN');
        }

        return accessToken;
    }

    async getUserToken(refreshToken) {
        try {
            const userToken = await this.tokenRepository.findOne({
                where: {
                    refreshToken,
                },
            });
            return userToken;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }

    async diasbleUserToken(refreshToken) {
        try {
            const updateDetail = await this.tokenRepository.updateOne({
                where: {
                    refreshToken,
                },
                data: {
                    expired: true,
                },
            });
            return updateDetail;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }

    async saveUserToken(userId, refreshToken) {
        const data = {
            userId,
            refreshToken,
        };
        return this.tokenRepository.create(data);
    }
}

export default AuthService;
