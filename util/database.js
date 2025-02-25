
const {Sequelize} = require("sequelize")

const sequelize = new Sequelize(
    "db_appeals",
    "postgres",
    "password",
    {
        host: "172.20.0.2",
        dialect: 'postgres',
        port: 5432
    }
);

module.exports = sequelize;