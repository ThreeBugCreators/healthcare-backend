/* eslint-disable no-undef */
import UserService from '../src/api/v1/users/service.js';
import { mongooseConnection } from '../src/frameworks/database/index.js';
import MongooseRepositoriesContainer from '../src/frameworks/database/repositories/index.js';

describe('UserService Tests', () => {
    test('Get one user', async () => {
        const mongoose = mongooseConnection('mongodb://localhost:27017/my-db');

        await mongoose.connect();

        const userRepository = MongooseRepositoriesContainer.init().userRepository.get();

        const userService = new UserService({
            repository: userRepository,
        });

        const res = await userService.getUserById('631379c20cadbf9eec3f895b');

        await mongoose.close();

        expect(JSON.parse(JSON.stringify(res))).toEqual({
            _id: '631379c20cadbf9eec3f895b',
            name: 'Thinh',
            surname: 'Le',
            username: 'lequocthinh',
            password: '$2a$10$e/.jkokkOZNujMCLVptcTep3dFogmpZGCTghrRT28jWaw9fFb4.I.',
            email: 'roshan321.lol@gmail.com',
            created: '2022-09-03T15:58:59.056Z',
            __v: 0,
        });
    });
});
