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

        return await this.repository.create({ username, email, password, name, surname });
    }
}

export default UserService;
