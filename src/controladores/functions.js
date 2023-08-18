let { contas, depositos, saques, transferencias } = require('../bancodedados.js');

function verificaConta(numero_conta, res) {
    if (isNaN(numero_conta)) {
        return res.status(400).json({ 'mensagem': 'Número de conta inválido.' });
    };

    const conta = contas.find((conta) => {
        return conta.numero === numero_conta;
    });

    if (!conta) {
        return res.status(404).json({ 'mensagem': 'Conta não encontrada.' });
    };

    return conta;
}


function verificaDados(nome, cpf, data_nascimento, telefone, email, senha, res) {
    if (!nome || nome.trim() === '') {
        erro = { 'mensagem': 'O nome deve ser informado.' };
    } else if (!cpf || cpf.trim() === '') {
        erro = { 'mensagem': 'O CPF deve ser informado.' };
    } else if (!data_nascimento || data_nascimento.trim() === '') {
        erro = { 'mensagem': 'A data de nascimento deve ser informada.' };
    } else if (!telefone || telefone.trim() === '') {
        erro = { 'mensagem': 'O telefone deve ser informado.' };
    } else if (!email || email.trim() === '') {
        erro = { 'mensagem': 'O email deve ser informado.' };
    } else if (!senha || senha.trim() === '') {
        erro = { 'mensagem': 'O senha deve ser informada.' };
    } else if (contas.find(conta => conta.usuario.nome === nome)) {
        erro = { 'mensagem': 'O nome informado já existe cadastrado!' };
    } else if (contas.find(conta => conta.usuario.cpf === cpf)) {
        erro = { 'mensagem': 'O CPF informado já existe cadastrado!' };
    } else if (contas.find(conta => conta.usuario.email === email)) {
        erro = { 'mensagem': 'O email informado já existe cadastrado!' };
    } else {
        erro = '0';
    }
    return erro;
}

function verificaCampos() {

}

module.exports = {
    verificaDados,
    verificaConta,
    verificaCampos
}