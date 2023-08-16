const express = require('express');
const validaSenha = require('./controladores/middleware.js');
const { listarContas, criarConta, atualizarUsuario, excluirConta } = require('./controladores/banco.js');
const rotas = express();

rotas.get('/contas', validaSenha, listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta);

module.exports = rotas;