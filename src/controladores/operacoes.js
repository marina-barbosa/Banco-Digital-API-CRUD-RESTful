let { depositos, saques, transferencias } = require('../bancodedados.js');
const { verificaConta, verificaValor, verificaSenha } = require('./validacoes.js');

const depositar = (req, res) => {
    const valor = Number(req.body.valor);
    const numero_conta = Number(req.body.numero_conta);

    const erro = verificaValor(valor);
    const conta = verificaConta(numero_conta);

    if (erro.length !== 0) {
        return res.status(400).json(erro);
    } else if (!conta) {
        return res.status(404).json({ 'mensagem': 'Conta não encontrada.' });
    }

    conta.saldo += valor

    depositos.push({
        "data": new Date(),
        "numero_conta": numero_conta,
        valor
    });

    return res.json();
};
const sacar = (req, res) => {
    const { senha } = req.body;
    const valor = Number(req.body.valor);
    const numero_conta = Number(req.body.numero_conta);

    const conta = verificaConta(numero_conta);

    if (!conta) {
        return res.status(404).json({ 'mensagem': 'Conta não encontrada.' });
    }

    let erro = verificaSenha(senha, conta);

    const erro2 = verificaValor(valor, conta.saldo, 2);

    if (erro.length !== 0 || erro2.length !== 0) {
        erro.push(erro2);
        return res.status(400).json(erro);
    } else {
        conta.saldo -= valor

        saques.push({
            "data": new Date(),
            "numero_conta": numero_conta,
            valor
        });

        return res.json();
    }
};

const transferir = (req, res) => {
    const { senha } = req.body;
    const numero_conta_origem = Number(req.body.numero_conta_origem);
    const numero_conta_destino = Number(req.body.numero_conta_destino);
    const valor = Number(req.body.valor);

    const contaOrigem = verificaConta(numero_conta_origem);
    const contaDestino = verificaConta(numero_conta_destino);

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ 'mensagem': 'Conta não encontrada.' });
    }

    let erro = verificaSenha(senha, contaOrigem);
    const erro2 = verificaValor(valor, contaOrigem.saldo, 2);

    if (erro.length !== 0 || erro2.length !== 0) {
        erro.push(erro2);
        return res.status(400).json(erro);
    } else {
        contaOrigem.saldo -= valor
        contaDestino.saldo += valor

        transferencias.push({
            "data": new Date(),
            "numero_conta_origem": numero_conta_origem,
            "numero_conta_destino": numero_conta_destino,
            "valor": valor
        });

        return res.json();
    }
}

module.exports = {
    depositar,
    sacar,
    transferir
}