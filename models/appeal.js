const Sequelize = require("sequelize");
const db = require('../util/database');

const Appeal = db.define('appeal', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    appeal_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    topic: {
        type: Sequelize.STRING,
        allowNull: false
    },
    appeal_text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reject_reason: Sequelize.STRING,
    resolve_text: Sequelize.STRING,
});

module.exports = Appeal;