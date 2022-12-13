import { Roles } from '../../../common/constants/index.js';

class RoomService {
    constructor({
        redisClient,
        userRepository,
        roomRepository,
        doctorInfoRepository,
    }) {
        this.userRepository = userRepository;
        this.redisClient = redisClient;
        this.roomRepository = roomRepository;
        this.doctorInfoRepository = doctorInfoRepository;
    }

    async createChatRoom({
        doctorId,
        username,
    }) {
        const [
            user,
            doctor,
        ] = await Promise.all([
            this.userRepository.findOne({
                where: {
                    username,
                    role: Roles.User,
                },
            }),
            this.userRepository.findOne({
                where: {
                    _id: doctorId,
                    role: Roles.Doctor,
                },
            }),
        ]);

        if (user && doctor) {
            const roomExisted = await this.roomRepository.findOne({
                where: {
                    $and: [
                        {
                            users: {
                                $elemMatch: {
                                    $in: [user._id],
                                },
                            },
                        },
                        {
                            users: {
                                $elemMatch: {
                                    $in: [doctor._id],
                                },
                            },
                        },
                        {
                            'users.2': {
                                $exists: false,
                            },
                        },
                    ],
                },
            });

            if (roomExisted) {
                return roomExisted;
            }

            const room = await this.roomRepository.create({
                name: this.buildRoomName({ doctor: doctor.name, user: user.name }),
                users: [
                    user._id,
                    doctor._id,
                ],
            });

            return room;
        }

        throw new Error('user_does_not_exist');
    }

    buildRoomName({ user, doctor }) {
        return `${user}, ${doctor}`;
    }

    async getRooms({ user }) {
        if (!user.username) {
            throw new Error();
        }

        const userData = await this.userRepository.findOne({
            where: {
                username: user.username,
            },
        });

        console.log(userData);

        const rooms = await this.roomRepository
            .find({
                where: {
                    users: {
                        $elemMatch: {
                            $eq: userData._id,
                        },
                    },
                },
                populate: {
                    path: 'users',
                    strictPopulate: false,
                },
            });

        return rooms;
    }
}

export default RoomService;
