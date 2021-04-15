
const Sequelize = require('sequelize');

const instancia = new Sequelize(
    "petshop",
    "root",
    "password",
    {
        host: "127.0.0.1",
        dialect:'mysql'
    }
);


module.exports = instancia;