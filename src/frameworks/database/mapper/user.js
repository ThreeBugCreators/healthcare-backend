export const toUserDomain = user => {
    const {
        _id,
        username,
        name,
        surname,
        email,
        created,
    } = user;

    return {
        _id,
        username,
        name,
        surname,
        email,
        created,
    };
};

