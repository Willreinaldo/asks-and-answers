const Sequelize = require('sequelize');
const connection = new Sequelize('Banco_de_Dados', 'Usuário', 'Sua_Senha',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
