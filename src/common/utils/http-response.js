const Response = {
    success: ({ res, code = 200, message = 'success', data }) =>
        res.status(code).json({
            data,
            message,
            success: 'success',
        }),
    error: ({ res, code = 400, message = 'failed' }) =>
        res.status(code).json({
            message,
            success: 'failed',
        }),
};

export default Response;
