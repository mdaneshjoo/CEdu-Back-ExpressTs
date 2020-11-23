const fs = require('fs');
import config from './config'

module.exports = {
    development: {
        username: config.dbconfig.username,
        password:config.dbconfig.password,
        database: config.dbconfig.database,
        host: config.dbconfig.host,
        dialect: config.dbconfig.driver,
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    production: {
        username: config.dbconfig.username,
        password:config.dbconfig.password,
        database: config.dbconfig.database,
        host: config.dbconfig.host,
        dialect: config.dbconfig.driver,

    }
};
