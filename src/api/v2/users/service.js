import Hasher from '../../../common/utils/password-hashing.js';

class UserService {
    constructor({ repository, redisClient }) {
        this.repository = repository;
        this.redisClient = redisClient;
    }

    async getUserById(id) {
        return await this.repository.findOne({ where: { _id: id } });
    }

    async createUser(data) {
        const {
            username,
            email,
            password,
            name,
            surname,
        } = data;

        const hashedPassword = await Hasher.hash(password);

        return await this.repository.create({
            username,
            email,
            name,
            surname,
            password: hashedPassword,
        });
    }
}

export default UserService;
