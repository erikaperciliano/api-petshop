const Modelo = require('./ModeloTabelaFornecedor');
const NaoEncontrado = require('../../erros/NaoEncontrados');

module.exports = {
    inserir(fornecedor){
        return Modelo.create(fornecedor);
    },

    listar(){
        return Modelo.findAll()
    },

    async pegarPorId(id){
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        });

        if(!encontrado){
            throw new NaoEncontrado();
        }

        return encontrado;
    },

    atualizar(id, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: {
                    id: id
                }
            }
        )
    },

    remover(id){
        return Modelo.destroy({
            where: {
                id: id
            }
        });
    }
}