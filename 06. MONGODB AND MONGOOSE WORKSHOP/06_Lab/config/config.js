const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbPath: 'mongodb://localhost:27017/rubiks-acc-db'
    },
    production: {}
};

module.exports = config[env];