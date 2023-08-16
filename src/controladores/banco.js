const { banco, contas, depositos, saques, transferencias } = require('../bancodedados.js');

const listarContas = (req, res) => {
    return res.json(contas);
}

module.exports = {
    listarContas,
}