const { MongoClient } = require('mongodb');

let dbConnection;

const connectToDb = (cb) => {
    // Check if already connected
    if (dbConnection) {
        console.log('Using existing DB connection');
        return cb();
    }

    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dietplanner';

    MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db();
            console.log('✅ Connected to MongoDB Native Driver');
            return cb();
        })
        .catch((err) => {
            console.error('❌ Connection Error:', err);
            return cb(err);
        });
};

const getDb = () => dbConnection;

module.exports = {
    connectToDb,
    getDb,
};
