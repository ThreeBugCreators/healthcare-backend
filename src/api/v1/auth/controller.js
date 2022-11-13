import BaseController from '../../../common/base/controller.js';
import logger from '../../../common/logging/index.js';
import ErrorMessage from '../../../common/utils/http-error.js';
import Response from '../../../common/utils/http-response.js';
import Mapper from '../../../frameworks/database/mapper/index.js';

class AuthController extends BaseController {
    async handleLogin(req, res) {
    }

    async handleRegister(req, res) {
    }

    async refreshAccessToken(req, res) {
    }
}

export default AuthController;
