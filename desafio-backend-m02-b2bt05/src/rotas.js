const express = require('express');
const { validaSenhaAdm } = require('./controladores/intermediario.js');
const rotas = express();
const {
    depositar,
    sacar,
    transferir } = require('./controladores/operacoes.js');
const {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    saldo,
    extrato
} = require('./controladores/usuarios.js');

rotas.get('/contas', validaSenhaAdm, listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numero/usuario', atualizarUsuario);
rotas.delete('/contas/:numero', excluirConta);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', saldo);
rotas.get('/contas/extrato', extrato);

module.exports = rotas;