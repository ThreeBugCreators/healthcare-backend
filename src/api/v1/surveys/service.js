class SurveyService {
    constructor({
        surveyRepository,
        redisUtil,
    }) {
        this.surveyRepository = surveyRepository;
        this.redisUtil = redisUtil;
    }

    async submitSurvey({
        doctorRating,
        infraRating,
        serviceRating,
        thoughts,
        user,
        surveyCode,
    }) {
        const [data, err] = await this.redisUtil
            .getFromRedis(`healthcare:survey:${surveyCode}`);

        if (err) {
            throw new Error('Survey Error');
        }

        const surveyData = JSON.parse(data);
        const {
            userData,
            doctor,
        } = surveyData;

        if (userData._id !== user._id || !doctor) {
            return;
        }

        this.redisUtil.deleteKey(`healthcare:survey:${surveyCode}`);

        return this.surveyRepository.create({
            doctorRating,
            infraRating,
            serviceRating,
            thoughts,
        });
    }
}

export default SurveyService;
