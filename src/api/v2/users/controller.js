import BaseController from '../../../common/base/controller.js';
import Response from '../../../common/utils/http-response.js';
import Mapper from '../../../frameworks/database/mapper/index.js';

class UserController extends BaseController {
    async getUserById(req, res) {
        const { id } = req.params;
        const userDoc = await this.service.getUserById(id);

        return Response.success({ res, data: Mapper.toUserDomain(userDoc) });
    }

    async createUser(req, res) {
        const { username, password, email, name, surname } = req.body;
        const userDoc = await this.service.createUser({
            username,
            password,
            email,
            name,
            surname,
        });

        return Response.success({ res, data: Mapper.toUserDomain(userDoc) });
    }

    async updateUser(req, res) {
        const { name, surname } = req.body;
        const userDoc = await this.service.updateUser({ name, surname });

        return Response.success({ res, data: Mapper.toUserDomain(userDoc) });
    }
}

export default UserController;
