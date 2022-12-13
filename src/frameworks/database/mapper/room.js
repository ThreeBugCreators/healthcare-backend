import { toUserDomain } from './user.js';

export const toRoomDomain = room => {
    const {
        _id,
        name,
        users,
    } = room;

    const userData = [];
    for (const user of users) {
        userData.push(toUserDomain(user));
    }

    return {
        _id,
        name,
        users: userData,
    };
};

export const toRoomsDomain = rooms => {
    const roomData = rooms.map(room => toRoomDomain(room));
    return roomData;
};
