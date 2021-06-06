const Sequelize = require("sequelize");
const connection = require("./database");
const Asks = connection.define('asks', {
    titulo: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNuull: false
    }
});
Asks.sync({force: false}).then(() => {
    console.log('table Asks created!');
})

module.exports = Asks;