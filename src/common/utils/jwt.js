import jwt from 'jsonwebtoken';
import moment from 'moment';
import logger from '../logging/index.js';

const { sign, verify } = jwt;

class JwtHelper {
    generateRefreshToken(userData) {
        return sign(
            userData,
            process.env.REFRESH_TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '10d',
                issuer: 'me',
            },
        );
    }

    generateAccessToken(userData) {
        return sign(
            userData,
            process.env.ACCESS_TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '10m',
                issuer: 'me',
            },
        );
    }

    generateToken(userData) {
        const accessToken = this.generateAccessToken(userData);
        const refreshToken = this.generateRefreshToken(userData);
        return { refreshToken, accessToken };
    }

    verifyAccessToken(token) {
        try {
            const jwtData = verify(token, process.env.ACCESS_TOKEN_SECRET || 'thisissecret');
            const { exp } = jwtData;
            const expiredAt = new Date(exp * 1000);
            const now = moment.utc().toDate();

            if (expiredAt <= now) {
                return false;
            }

            return jwtData;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }

    verifyRefreshToken(token) {
        try {
            const jwtData = verify(token, process.env.REFRESH_TOKEN_SECRET || 'thisissecret');
            const { exp } = jwtData;
            const expiredAt = new Date(exp * 1000);
            const now = moment.utc().toDate();

            console.log({
                expiredAt,
                now,
            });

            return jwtData;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }
}

export default new JwtHelper();
