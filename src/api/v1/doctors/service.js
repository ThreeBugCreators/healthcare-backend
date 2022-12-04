import axios from 'axios';
import { Roles } from '../../../common/constants/index.js';
import logger from '../../../common/logging/index.js';
import Hasher from '../../../common/utils/password-hashing.js';

class DoctorService {
    constructor({
        userRepository,
        doctorInfoRepository,
        redisClient,
        mongooseConnection,
    }) {
        this.userRepository = userRepository;
        this.doctorInfoRepository = doctorInfoRepository;
        this.redisClient = redisClient;
        this.mongooseConnection = mongooseConnection;
    }

    async createDoctor({
        username,
        password,
        name,
        surname,
        email,
        specialists,
    }) {
        let createDoctorResult = {};
        const hashedPassword = await Hasher.hash(password);

        try {
            const user = await this.userRepository.create({
                username,
                name,
                surname,
                email,
                password: hashedPassword,
                role: Roles.Doctor,
            });

            let doctorInfo;

            try {
                doctorInfo = await this.doctorInfoRepository.create({
                    doctorId: String(user._id),
                    specialists,
                    name,
                });
            } catch (error) {
                logger.error(error);
                await this.userRepository.cleanedDelete({
                    where: {
                        _id: user._id,
                    },
                });
                throw error;
            }

            createDoctorResult = {
                success: true,
                data: {
                    ...user,
                    ...doctorInfo,
                },
            };
        } catch (error) {
            console.error(error);
            createDoctorResult = {
                success: false,
                message: error.message,
            };
        }

        return createDoctorResult;
    }

    async getById(doctorId) {
        const doctor = await this.doctorInfoRepository.findOne({
            where: {
                doctorId,
            },
        });

        return doctor;
    }

    async getDoctors({ specialist, name }) {
        const query = {};

        if (name) {
            query.name = name;
        }

        if (specialist) {
            query.specialists = {
                $elemMatch: {
                    name: specialist,
                },
            };
        }

        const doctors = await this.doctorInfoRepository.find({
            where: query,
        });

        return doctors;
    }

    async getDoctorsBySymptoms({ symptoms }) {
        const url = `${process.env.MODEL_SERVER}/api/v1/predictions${(new URLSearchParams(symptoms)).toString()}`;
        const result = await axios.get(url, {
            headers: {
                authorization: `${process.env.SERVER_API_KEY}`,
                'content-type': 'application/json',
            },
        });

        const {
            disases,
            bodyParts,
        } = result;

        return { disases, bodyParts };
    }
}

export default DoctorService;
