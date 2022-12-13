import BaseController from '../../../common/base/controller.js';
import Response from '../../../common/utils/http-response.js';

class MessageController extends BaseController {
    async getRoomMessages(req, res) {
        const { roomId, offset } = req.query;
        const { user } = req;

        const messeges = await this.service.getRoomMessages({
            roomId,
            user,
            offset,
        });

        return Response.success({ res, data: messeges });
    }
}

export default MessageController;
