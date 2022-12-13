import moment from 'moment';

class AppointmentService {
    constructor({ userRepository, appointmentRepository, redisClient }) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
        this.redisClient = redisClient;
    }

    async createAppointment({
        user,
        appointmentData,
    }) {
        const {
            doctor,
            date,
            note,
        } = appointmentData;

        console.log({
            doctor,
            date,
            note,
            user,
        });

        return await this.appointmentRepository.create({
            note,
            doctor,
            time: moment(date),
            userId: user._id,
        });
    }

    async getAppointments({
        appointmentStatus,
        user,
    }) {
        const appointments = await this.appointmentRepository.find({
            where: {
                userId: user._id,
                status: appointmentStatus,
            },
            populate: {
                path: 'doctor',
                select: 'email name surname',
                strictPopulate: false,
            },
        });

        return appointments;
    }
}

export default AppointmentService;
