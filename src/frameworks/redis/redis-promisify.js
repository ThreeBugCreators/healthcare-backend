const init = client => {
    const performOperation = promise =>
        promise
            .then(data => [undefined, data])
            .catch(err => [err, undefined]);

    return {
        getClient() {
            return client;
        },

        multi() {
            return client.multi();
        },

        getFromRedis(key) {
            return performOperation(client.get(key));
        },

        deleteKey(key) {
            return performOperation(client.del(key));
        },

        setToRedis(key, value) {
            return performOperation(client.set(key, value));
        },

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

        hGetAllFromRedis(key) {
            return performOperation(client.hGetAll(key));
        },

        addToSet(key, value) {
            return performOperation(client.sAdd(key, value));
        },

        getFromSet(key) {
            return performOperation(client.sMembers(key));
        },

        removeItemFromSet(key, item) {
            return performOperation(client.sRem(key, item));
        },
    };
};

export default init;
