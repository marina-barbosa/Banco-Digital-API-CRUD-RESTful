let { contas, depositos, saques, transferencias } = require('../bancodedados.js');
const { verificaConta, verificaCampoVazio, verificaDadoUnico, verificaValor, verificaSenha } = require('./functions.js');
let numeroContas = 2;

const listarContas = (req, res) => {
    return res.json(contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const erro = verificaDadoUnico(nome, cpf, email)

    if (erro.length !== 0) {
        return res.status(400).json(erro);
    } else {
        numeroContas++;
        const novaConta = {
            "numero": numeroContas,
            "saldo": 0,
            "usuario": {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }
        contas.push(novaConta);

        return res.status(201).send();
    }
}

const atualizarUsuario = (req, res) => {
    const numero_conta = Number(req.params.numero);
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const campos = { nome, cpf, data_nascimento, telefone, email, senha };

    const conta = verificaConta(numero_conta);
    const erro = verificaCampoVazio(campos);
    const erro2 = verificaDadoUnico(nome, cpf, email);

    if (erro.length !== 0 || erro2.length !== 0) {
        erro.push(erro2);
        return res.status(400).json(erro);
    } else if (!conta) {
        return res.status(404).json({ 'mensagem': 'Conta não encontrada.' });
    } else {
        conta.usuario = {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
        return res.status(201).json();
    }
}

const excluirConta = (req, res) => {
    const numero_conta = Number(req.params.numero);

    const conta = verificaConta(numero_conta);

    if (!conta) {
        return res.status(404).json({ 'mensagem': 'Conta não encontrada.' });
    } else if (conta.saldo == 0) {
        return res.status(403).json({ 'mensagem': 'A conta só pode ser removida se o saldo for zero!' });
    } else {
        contas = contas.filter((conta) => {
            return conta.numero !== numero_conta;
        });

        return res.status(204).json();
    }
}

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

const saldo = (req, res) => {
    const { senha } = req.query;
    const numero_conta = Number(req.query.numero_conta);

    const conta = verificaConta(numero_conta);

    if (!conta) {
        return res.status(404).json({ 'mensagem': 'Conta não encontrada.' });
    }

    const erro = verificaSenha(senha, conta);

    if (erro.length !== 0) {
        return res.status(400).json(erro);
    }

    return res.json(conta.saldo);
};

const extrato = (req, res) => {
    const { senha } = req.query;
    const numero_conta = Number(req.query.numero_conta);

    const conta = verificaConta(numero_conta);

    if (!conta) {
        return res.status(404).json({ 'mensagem': 'Conta não encontrada.' });
    }

    const erro = verificaSenha(senha, conta);

    if (erro.length !== 0) {
        return res.status(400).json(erro);
    }

    let extrato = {
        depositos: depositos.filter((item) => {
            return item.numero_conta === numero_conta
        }),
        saques: saques.filter((item) => {
            return item.numero_conta === numero_conta
        }),
        transferenciasEnviadas: transferencias.filter((item) => {
            return item.numero_conta_origem === numero_conta
        }),
        transferenciasRecebidas: transferencias.filter((item) => {
            return item.numero_conta_destino === numero_conta
        })
    }

    return res.json(extrato);
};

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}