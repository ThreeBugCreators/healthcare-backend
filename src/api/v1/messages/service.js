class MessageSerivce {
    constructor({
        userRepository,
        messageRepository,
        roomRepository,
        redisClient,
    }) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
        this.redisClient = redisClient;
        this.roomRepository = roomRepository;
    }

    async getRoomMessages({ roomId, user }) {
        console.log(user);

        const room = await this.roomRepository.findOne({
            where: {
                _id: roomId,
            },
        });

        let isUserInRoom = false;

        if (
            room
            && room.users
            && room.users.length
        ) {
            const users = room.users.map(user => String(user._id));
            if (users.includes(user._id)) {
                isUserInRoom = true;
            }
        }

        if (!isUserInRoom) {
            throw new Error();
        }

        return this.messageRepository.find({
            where: {
                roomId,
            },
            limit: 20,
            offset: 0,
        });
    }

    sendMeesage() {

    }
}

export default MessageSerivce;
