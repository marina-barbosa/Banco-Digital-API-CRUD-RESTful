let { banco, contas, depositos, saques, transferencias } = require('../bancodedados.js');
let numeroContas = 2;

const listarContas = (req, res) => {
    return res.json(contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const erro = verificaDados(nome, cpf, data_nascimento, telefone, email, senha)

    if (erro !== '0') {
        return res.status(400).json(erro);
    }

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

const atualizarUsuario = (req, res) => {
    const numeroConta = Number(req.params.numeroConta);
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (isNaN(numeroConta)) {
        return res.status(400).json({ mensagem: 'Número de conta inválido.' });
    }

    const conta = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' });
    };

    const erro = verificaDados(nome, cpf, data_nascimento, telefone, email, senha)

    if (erro !== '0') {
        return res.status(400).json(erro);
    }

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

const excluirConta = (req, res) => {
    const numeroConta = Number(req.params.numeroConta);

    if (isNaN(numeroConta)) {
        return res.status(400).json({ mensagem: 'Número de conta inválido.' });
    }

    const conta = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' });
    };

    if (conta.saldo !== 0) {
        return res.status(403).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    contas = contas.filter((conta) => {
        return conta.numero !== numeroConta;
    });

    return res.status(204).json();
}

// function verificaNumeroConta(numeroConta) { }

function verificaDados(nome, cpf, data_nascimento, telefone, email, senha) {
    if (!nome || nome.trim() === '') {
        erro = { "mensagem": "O nome deve ser informado." };
    } else if (!cpf || cpf.trim() === '') {
        erro = { "mensagem": "O CPF deve ser informado." };
    } else if (!data_nascimento || data_nascimento.trim() === '') {
        erro = { "mensagem": "A data de nascimento deve ser informada." };
    } else if (!telefone || telefone.trim() === '') {
        erro = { "mensagem": "O telefone deve ser informado." };
    } else if (!email || email.trim() === '') {
        erro = { "mensagem": "O email deve ser informado." };
    } else if (!senha || senha.trim() === '') {
        erro = { "mensagem": "O senha deve ser informada." };
    } else if (contas.find(conta => conta.usuario.nome === nome)) {
        erro = { "mensagem": "O nome informado já existe cadastrado!" };
    } else if (contas.find(conta => conta.usuario.cpf === cpf)) {
        erro = { "mensagem": "O CPF informado já existe cadastrado!" };
    } else if (contas.find(conta => conta.usuario.email === email)) {
        erro = { "mensagem": "O email informado já existe cadastrado!" };
    } else {
        erro = '0';
    }
    return erro;
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
}