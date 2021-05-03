const config = require('../config')

module.exports = {
    "username": config.DB_USERNAME,
    "password": config.DB_PASSWORD,
    "database": config.DB_NAME,
    "host": config.DB_HOST,
    "dialect": "postgres",
    "port": config.DB_PORT,
    "define": {
        "timestamps": true
    }
}
