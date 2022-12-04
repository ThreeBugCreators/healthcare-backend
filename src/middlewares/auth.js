import { StatusCodes } from 'http-status-codes';

import JwtHelper from '../common/utils/jwt.js';
import Response from '../common/utils/http-response.js';

class AuthMiddleware {
    async interceptToken(req, res, next) {
        const {
            'access-token': accessToken,
            'refresh-token': refreshToken,
        } = req.headers;

        const isAccessTokenAlive = JwtHelper.verifyAccessToken(accessToken);
        const isRefreshTokenAlive = JwtHelper.verifyRefreshToken(refreshToken);

        if (!isAccessTokenAlive || !isRefreshTokenAlive) {
            return Response.error({
                res,
                code: StatusCodes.UNAUTHORIZED,
                message: 'token_expired',
            });
        }

        req.user = isAccessTokenAlive;

        return next();
    }
}

export default new AuthMiddleware();

