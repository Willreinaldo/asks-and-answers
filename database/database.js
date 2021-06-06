const Sequelize = require('sequelize');
const connection = new Sequelize('guia_perguntas','root','williammonteiro10',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;