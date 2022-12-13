import BaseController from '../../../common/base/controller.js';
import Response from '../../../common/utils/http-response.js';

class SurvetController extends BaseController {
    async submitSurvey(req, res) {
        const {
            doctorRating,
            serviceRating,
            infraRating,
            thoughts,
            surveyCode,
        } = req.body;

        const { user } = req;

        await this.service.createSurvey({
            doctorRating,
            serviceRating,
            infraRating,
            thoughts,
            user,
            surveyCode,
        });

        return Response.success({ res });
    }
}

export default SurvetController;
