const { banco } = require('../bancodedados.js');

const validaSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (senha_banco !== banco.senha) {
        return res.status(403).json({ "mensagem": "A senha do banco informada é inválida!" });
    }
    next();
}

module.exports = validaSenha;