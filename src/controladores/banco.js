const { banco, contas, depositos, saques, transferencias } = require('../bancodedados.js');
let numeroContas = 2;

const listarContas = (req, res) => {
    return res.json(contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;



    if (!nome) {
        return res.status(400).json({ "mensagem": "O nome deve ser informado." });
    }

    if (!cpf) {
        return res.status(400).json({ "mensagem": "O CPF deve ser informado." });
    }

    if (!data_nascimento) {
        return res.status(400).json({ "mensagem": "A data de nascimento deve ser informada." });
    }

    if (!telefone) {
        return res.status(400).json({ "mensagem": "O telefone deve ser informado." });
    }

    if (!email) {
        return res.status(400).json({ "mensagem": "O email deve ser informado." });
    }

    if (!senha) {
        return res.status(400).json({ "mensagem": "O senha deve ser informada." });
    }

    if (contas.find(conta => conta.usuario.nome === nome)) {
        return res.status(400).json({ "mensagem": "O nome informado já existe cadastrado!" });
    }

    if (contas.find(conta => conta.usuario.cpf === cpf)) {
        return res.status(400).json({ "mensagem": "O CPF informado já existe cadastrado!" });
    }

    if (contas.find(conta => conta.usuario.email === email)) {
        return res.status(400).json({ "mensagem": "O email informado já existe cadastrado!" });
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

module.exports = {
    listarContas,
    criarConta,
}