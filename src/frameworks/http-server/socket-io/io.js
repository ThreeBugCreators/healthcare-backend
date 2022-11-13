import logger from '../../../common/logging/index.js';

const integrateSocket = (io, _redisUtil) => {
    logger.info('Setting up socket');
    io.on('connection', _socket => {
        logger.info('Socket connection established');
    });

    setupChatNamespace(io);
};

const setupChatNamespace = io => {
    logger.info('Setting up socket with namespace /chat');
    const chatAdapter = io.of('/chat').on('connection', socket => {
        console.log('socket log');
        socket.on('message', data => {
            console.log(data);
        });
    });

    return chatAdapter;
};

export default integrateSocket;
