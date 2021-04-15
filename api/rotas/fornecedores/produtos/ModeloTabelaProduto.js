const Sequelize = require('sequelize');
const instancia = require('../../../banco-de-dados/index'); //conexão com o banco

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    preco:{
        type:Sequelize.DOUBLE,
        allowNull: false
    },

    estoque:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    
    //relacionamento dessa tabela com a tabela de fornecedor
    fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../ModeloTabelaFornecedor'),
            key: 'id'
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'produtos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt:'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('produto', colunas, opcoes);