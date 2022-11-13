const init = client => {
    const performOperation = promise =>
        promise
            .then(data => [undefined, data])
            .catch(err => [err, undefined]);

    return {
        getClient: () => client,

        multi: () => client.multi(),

        getFromRedis: key => performOperation(client.get(key)),

        setToRedis: (key, value) => performOperation(client.set(key, value)),

        setExpireToRedis(key, value, ttl) {
            if (typeof value === 'object') {
                return performOperation(
                    client.setEx(key, JSON.stringify(value), ttl),
                );
            }

            return performOperation(client.setEx(key, value, ttl));
        },

        hmSetToRedis(key, field, value) {
            return performOperation(client.hSet(key, field, value));
        },

        hmGetFromRedis(key, field) {
            return performOperation(client.hmGet(key, field));
        },

        hGetAllFromRedis: key => performOperation(client.hGetAll(key)),
    };
};

export default init;
