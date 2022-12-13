import BaseController from '../../../common/base/controller.js';
import Response from '../../../common/utils/http-response.js';

class DoctorController extends BaseController {
    async getById(req, res) {
        const { id } = req.params;
        const doctor = await this.service.getById(id);
        return Response.success({ res, data: { doctor } });
    }

    async getDoctors(req, res) {
        const {
            specialist,
            name,
            symptoms,
        } = req.query;

        if (symptoms) {
            const symptomData = symptoms.split(',');
            if (symptomData.length > 0) {
                const doctors = await this.service.getDoctorsBySymptoms({
                    symptoms: symptomData,
                });

                return Response.success({ res, data: doctors });
            }
        }

        const doctors = await this.service.getDoctors({ specialist, name });
        return Response.success({ res, data: doctors });
    }

    async createDoctor(req, res) {
        const doctor = await this.service.createDoctor(req.body);
        return Response.success({ res, data: { doctor } });
    }
}

export default DoctorController;
