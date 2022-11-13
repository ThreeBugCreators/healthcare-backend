db.createUser({
    user: 'root',
    pwd: 'example',
    roles: [
        {
            role: 'readWrite',
            db: 'my-db',
        },
    ],
});

db = new Mongo().getDB("dump");
db.createCollection('dump', { capped: false });

db.dump.insert([
    { "item": 1 },
]);