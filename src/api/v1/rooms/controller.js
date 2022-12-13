import BaseController from '../../../common/base/controller.js';
import Response from '../../../common/utils/http-response.js';
import Mapper from '../../../frameworks/database/mapper/index.js';

class RoomController extends BaseController {
    async createRoom(req, res) {
        const { user } = req;
        const { doctorId } = req.params;
        const room = await this.service.createChatRoom({
            doctorId,
            username: user.username,
        });
        return Response.success({ res, data: room });
    }

    async getRooms(req, res) {
        const { user } = req;
        const rooms = await this.service.getRooms({ user });

        return Response.success({
            res,
            data: Mapper.toRoomsDomain(rooms),
        });
    }

    // A async deleteRoom(req, res) {

    // }
}

export default RoomController;
