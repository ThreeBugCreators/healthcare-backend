import BaseController from '../../../common/base/controller.js';
import logger from '../../../common/logging/index.js';
import ErrorMessage from '../../../common/utils/http-error.js';
import Response from '../../../common/utils/http-response.js';
import Mapper from '../../../frameworks/database/mapper/index.js';

class AuthController extends BaseController {
    async handleLogin(req, res) {
        try {
            const {
                username,
                password,
            } = req.body;

            const credentials = await this.service.login({ username, password });

            return Response.success({ res, data: credentials });
        } catch (error) {
            logger.log(error);

            if (error.message === ErrorMessage.PasswordIsInvalid.key) {
                return Response.error({
                    res,
                    code: ErrorMessage.PasswordIsInvalid.code,
                    message: ErrorMessage.PasswordIsInvalid.message,
                });
            }

            throw error;
        }
    }

    async handleRegister(req, res) {
        const userCreated = await this.service.register(req.body);

        return Response.success({ res, data: Mapper.toUserDomain(userCreated) });
    }

    async refreshAccessToken(req, res) {
        const {
            'refresh-token': refreshToken,
            'access-token': accessToken,
        } = req.headers;

        const credentials = await this.service.refreshAccessToken({
            refreshToken,
            accessToken,
        });

        return Response.success({ res, data: credentials });
    }
}

export default AuthController;
