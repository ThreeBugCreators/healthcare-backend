const mongoDbConfiguration = {
    connectionString: process.env.MONGO_URI || 'mongodb://localhost:27017/my-db',
};

export { mongoDbConfiguration };
