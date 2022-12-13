/* eslint-disable no-unused-vars */
import logger from '../../../common/logging/index.js';
import handleChatMessage from './chat.js';
import JwtHelper from '../../../common/utils/jwt.js';

const integrateSocket = (io, {
    roomRepository,
    userRepository,
    messageRepository,
    redisClient,
}) => {
    logger.info('Setting up socket');
    io.on('connection', _socket => {
        logger.info('Socket connection established');
    });

    setupChatNamespace(io, {
        userRepository,
        roomRepository,
        messageRepository,
        redisUtil: redisClient,
    });
};

const setupChatNamespace = (io, {
    redisUtil,
    userRepository,
    roomRepository,
    messageRepository,
}) => {
    logger.info('Setting up socket with namespace /chat');
    const chatAdapter = io.of('/chat');

    chatAdapter.on('connection', async socket => {
        try {
            const userCredential = socket.handshake.auth;
            const { 'access-token': accessToken } = userCredential;

            const userData = JwtHelper.verifyAccessToken(accessToken);
            console.log({
                userData,
                socket: socket.id,
            });

            await saveUserSocketConnection({
                redisUtil,
                userData,
                socketId: socket.id,
            });

            socket.on('disconnect', () => {
                redisUtil.removeItemFromSet(
                    `socket:connection:${userData._id}`,
                    socket.id,
                );
            });

            socket.on('message', async chatData => {
                try {
                    const message = JSON.parse(chatData);
                    handleChatMessage(message, {
                        redisUtil,
                        roomRepository,
                        messageRepository,
                        socket: chatAdapter,
                    }).catch(err => logger.error(err));
                } catch (error) {
                    logger.error(error);
                }
            });
        } catch (error) {
            logger.error(error);
        }
    });

    return chatAdapter;
};

function saveUserSocketConnection({
    redisUtil,
    userData,
    socketId,
}) {
    const userSocketRedisKey = `socket:connection:${userData._id}`;
    return redisUtil.addToSet(userSocketRedisKey, socketId);
}

export default integrateSocket;
