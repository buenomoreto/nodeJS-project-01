const sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define('resposta', {
    corpo: {
      type: sequelize.TEXT,
      allowNull: false
    },
    perguntaID: {
      type: sequelize.INTEGER,
      allowNull: false
    }
});

Resposta.sync({force: false});

module.exports = Resposta;