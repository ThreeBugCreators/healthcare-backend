import _ from 'lodash';
import logger from '../../../common/logging/index.js';

export default async function handleChatMessage(message, {
    messageRepository,
    redisUtil,
    roomRepository,
    socket,
}) {
    const {
        content,
        from,
        room,
    } = message;

    try {
        await messageRepository.create({
            content,
            room: room._id,
            from: from._id,
        });

        const roomData = await roomRepository.findOne({
            _id: room._id,
        });

        let userIds = [];

        try {
            userIds = roomData.users.map(user => String(user._id));
        } catch (error) {
            logger.error(error);
        }

        let socketIds = await Promise.all(
            userIds.map(async id => {
                if (id === from._id) {
                    return Promise.resolve([]);
                }

                const [, ids] = await redisUtil.getFromSet(`socket:connection:${id}`);
                return ids;
            }),
        );

        socketIds = _.uniq(_.flatten(socketIds));
        console.log(socketIds);

        const messageToSend = JSON.stringify(message);

        await Promise.all(socketIds.map(
            id => socket.to(id).emit('emit-message', messageToSend),
        ));
    } catch (error) {
        console.log(error);
    }
}
