/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '../src/load-env.js';

import chai from 'chai';
import chaiHttp from 'chai-http';

import { setupRedis } from '../src/frameworks/redis/index.js';
import {
    setupMongoDB,
    databaseConnection,
} from '../src/frameworks/database/index.js';

import {
    app,
    bootstrapApi,
} from '../src/frameworks/http-server/index.js';

const should = chai.should();

chai.use(chaiHttp);

describe('Auth - Register', () => {
    beforeEach(done => {
        // Before each test we empty the database in your case
        done();
    });

    describe('/POST register', () => {
        it('it should be return user created in data response', async () => {
            try {
                const [redisUtil] = await Promise.all([
                    setupRedis(),
                    setupMongoDB(),
                ]);

                bootstrapApi({
                    app,
                    redisUtil,
                    databaseConnection,
                });

                const user = {
                    username: 'lequocthinh1',
                    password: 'thinh12345',
                    email: 'roshan321.lol@gmail.com',
                    name: 'Thinh',
                    surname: 'Le',
                };

                chai.request(app)
                    .post('/api/v1/auth/register')
                    .set('Content-Type', 'application/json')
                    .send(user)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('username');
                    });
            } catch (err) {
                console.error(err);
            }
        });
    });
});
