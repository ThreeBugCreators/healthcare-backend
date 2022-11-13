function isAsynchronous(func) {
    return func.constructor.name === 'AsyncFunction';
}

const tryCatchWrapper = ({ context, method }) => {
    if (isAsynchronous(method)) {
        return (async function (req, res, next) {
            try {
                const bound = method.bind(context);
                return await bound(req, res);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        });
    }

    return function (req, res, next) {
        try {
            const bound = method.bind(context);
            return bound(req, res);
        } catch (error) {
            console.error(error);
            return next(error);
        }
    };
};

export default tryCatchWrapper;
