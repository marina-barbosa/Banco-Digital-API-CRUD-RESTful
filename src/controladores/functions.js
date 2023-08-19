let { contas } = require('../bancodedados.js');


function verificaConta(numero_conta) {
    if (isNaN(numero_conta)) {
        return false;
    };

    const conta = contas.find((conta) => {
        return conta.numero === numero_conta;
    });

    if (!conta) {
        return false;
    };

    return conta;
}

function verificaDadoUnico(nome, cpf, email) {
    let erro = [];
    if (contas.find(conta => conta.usuario.nome === nome)) {
        erro.push({ 'mensagem': 'O nome informado já existe cadastrado!' });
    }
    if (contas.find(conta => conta.usuario.cpf === cpf)) {
        erro.push({ 'mensagem': 'O CPF informado já existe cadastrado!' });
    }
    if (contas.find(conta => conta.usuario.email === email)) {
        erro.push({ 'mensagem': 'O email informado já existe cadastrado!' });
    }
    return erro;
}

function verificaCampoVazio(campos) {
    let erro = []
    for (let campo in campos) {
        if (!campos[campo] || campos[campo].trim() === '') {
            erro.push({ 'mensagem': `O campo ${campo} deve ser informado.` })
        }
    }
    return erro;
}

function verificaValor(valor, saldo, modo) {
    let erro = []
    if (!valor) {
        erro.push({ 'mensagem': 'O campo valor deve ser informado.' });
    }
    if (isNaN(valor)) {
        erro.push({ 'mensagem': 'Valor inválido' });
    }
    if (valor <= 0) {
        erro.push({ 'mensagem': 'O valor nao pode ser zero ou negativo.' });
    }
    if (modo = 2) {
        if (valor > saldo) {
            erro.push({ 'mensagem': 'Saldo insuficiente.' });
        }
    }
    return erro;
}

function verificaSenha(senha, conta) {
    let erro = []

    if (!senha) {
        erro.push({ 'mensagem': 'Senha obrigatória!' });
    }

    if (senha !== conta.usuario.senha) {
        erro.push({ 'mensagem': 'Senha inválida.' });
    }
    return erro;
}


module.exports = {
    verificaDadoUnico,
    verificaConta,
    verificaCampoVazio,
    verificaValor,
    verificaSenha
}