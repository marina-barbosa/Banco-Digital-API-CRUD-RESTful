let { contas, depositos, saques, transferencias } = require('../bancodedados.js');
const { verificaDados, verificaConta, verificaCampos } = require('./functions.js');
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
    const numero_conta = Number(req.params.numero);
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = verificaConta(numero_conta, res);

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
    const numero_conta = Number(req.params.numero);

    const conta = verificaConta(numero_conta, res);

    if (conta.saldo !== 0) {
        return res.status(403).json({ 'mensagem': 'A conta só pode ser removida se o saldo for zero!' });
    }

    contas = contas.filter((conta) => {
        return conta.numero !== numero_conta;
    });

    return res.status(204).json();
}

const depositar = (req, res) => {
    const { valor } = req.body;
    const numero_conta = req.body.numero_conta;

    if (!numero_conta || !valor) {
        return res.status(400).json({ 'mensagem': 'O número da conta e o valor são obrigatórios!' });
    }

    const conta = verificaConta(numero_conta, res);

    if (valor <= 0) {
        return res.status(400).json({ 'mensagem': 'Não é permitido depósitos com valores negativos ou zerados' });
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
    const { valor, senha } = req.body;
    const numero_conta = req.body.numero_conta;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ 'mensagem': 'O número da conta, o valor do saque e a senha são obrigatórios!' });
    }

    const conta = verificaConta(numero_conta, res);

    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ 'mensagem': 'Senha inválida.' });
    }

    if (valor > conta.saldo || valor <= 0) {
        return res.status(400).json({ 'mensagem': 'Valor inválido' });
    }

    conta.saldo -= valor

    saques.push({
        "data": new Date(),
        "numero_conta": numero_conta,
        valor
    });

    return res.json();
};

const transferir = (req, res) => {
    const { valor, numero_conta_origem, numero_conta_destino, senha } = req.body;

    if (!valor || !numero_conta_origem || !numero_conta_destino || !senha) {
        return res.status(400).json({ 'mensagem': 'Os números das contas, o valor da transferencia e a senha são obrigatórios!' });
    }

    const contaOrigem = verificaConta(numero_conta_origem, res);
    const contaDestino = verificaConta(numero_conta_destino, res);

    if (senha !== contaOrigem.usuario.senha) {
        return res.status(400).json({ 'mensagem': 'Senha inválida.' });
    }

    if (valor > contaOrigem.saldo || valor <= 0) {
        return res.status(400).json({ 'mensagem': 'Valor inválido' });
    }

    contaOrigem.saldo -= valor
    contaDestino.saldo += valor

    transferencias.push({
        "data": new Date(),
        "numero_conta_origem": numero_conta_origem,
        "numero_conta_destino": numero_conta_destino,
        "valor": valor
    });

    return res.json();
};

const saldo = (req, res) => {
    const { senha } = req.query;
    const numero_conta = Number(req.query.numero_conta);

    if (!numero_conta || !senha) {
        return res.status(400).json({ 'mensagem': 'O número da conta e senha são obrigatórios!' });
    }

    const conta = verificaConta(numero_conta, res);

    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ 'mensagem': 'Senha inválida.' });
    }

    return res.json(conta.saldo);
};

const extrato = (req, res) => {
    const { senha } = req.query;
    const numero_conta = Number(req.query.numero_conta);

    if (!numero_conta || !senha) {
        return res.status(400).json({ 'mensagem': 'O número da conta e senha são obrigatórios!' });
    }

    const conta = verificaConta(numero_conta, res);

    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ 'mensagem': 'Senha inválida.' });
    }

    let extrato = {
        depositos: depositos.filter((item) => {
            return item.numero_conta === 1
        }),
        saques: saques.filter((item) => {
            return item.numero_conta === 1
        }),
        transferenciasEnviadas: transferencias.filter((item) => {
            return item.numero_conta_origem === 1
        }),
        transferenciasRecebidas: transferencias.filter((item) => {
            return item.numero_conta_destino === 1
        })
    }

    return res.json(extrato);
};

// function verificaConta(numero_conta, res) {
//     if (isNaN(numero_conta)) {
//         return res.status(400).json({ 'mensagem': 'Número de conta inválido.' });
//     };

//     const conta = contas.find((conta) => {
//         return conta.numero === numero_conta;
//     });

//     if (!conta) {
//         return res.status(404).json({ 'mensagem': 'Conta não encontrada.' });
//     };

//     return conta;
// }


// function verificaDados(nome, cpf, data_nascimento, telefone, email, senha, res) {
//     if (!nome || nome.trim() === '') {
//         erro = { 'mensagem': 'O nome deve ser informado.' };
//     } else if (!cpf || cpf.trim() === '') {
//         erro = { 'mensagem': 'O CPF deve ser informado.' };
//     } else if (!data_nascimento || data_nascimento.trim() === '') {
//         erro = { 'mensagem': 'A data de nascimento deve ser informada.' };
//     } else if (!telefone || telefone.trim() === '') {
//         erro = { 'mensagem': 'O telefone deve ser informado.' };
//     } else if (!email || email.trim() === '') {
//         erro = { 'mensagem': 'O email deve ser informado.' };
//     } else if (!senha || senha.trim() === '') {
//         erro = { 'mensagem': 'O senha deve ser informada.' };
//     } else if (contas.find(conta => conta.usuario.nome === nome)) {
//         erro = { 'mensagem': 'O nome informado já existe cadastrado!' };
//     } else if (contas.find(conta => conta.usuario.cpf === cpf)) {
//         erro = { 'mensagem': 'O CPF informado já existe cadastrado!' };
//     } else if (contas.find(conta => conta.usuario.email === email)) {
//         erro = { 'mensagem': 'O email informado já existe cadastrado!' };
//     } else {
//         erro = '0';
//     }
//     return erro;
// }

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