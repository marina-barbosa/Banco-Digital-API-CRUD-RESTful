const express = require('express');
const validaSenha = require('./controladores/middleware.js');
const {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
} = require('./controladores/banco.js');
const rotas = express();

rotas.get('/contas', validaSenha, listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo?numero_conta=123&senha=123', saldo);
rotas.get('/contas/extrato?numero_conta=123&senha=123', extrato);

module.exports = rotas;