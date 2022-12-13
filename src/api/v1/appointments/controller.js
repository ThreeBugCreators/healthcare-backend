import BaseController from '../../../common/base/controller.js';
import Response from '../../../common/utils/http-response.js';

class AppointmentController extends BaseController {
    async createAppointment(req, res) {
        const { user } = req;
        const appointment = await this.service.createAppointment({
            user,
            appointmentData: req.body,
        });

        return Response.success({ res, data: appointment });
    }

    async getAppointments(req, res) {
        const { user } = req;
        const appointments = await this.service.getAppointments({
            user,
            appointmentStatus: req.body.status,
        });

        console.log(appointments);

        return Response.success({ res, data: appointments });
    }
}

export default AppointmentController;
