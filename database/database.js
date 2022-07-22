const { Sequelize } = require('sequelize');

const connection = new Sequelize('perguntas', 'root', 'TEST', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;