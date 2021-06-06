const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('resposta', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaid: {
        type: INTEGER,
        allowNuull: false
    }
});
Resposta.sync({force: false}).then(() => {
    console.log('table answers created!');
})

module.exports = Resposta;