const express = require('express');
const validaSenha = require('./controladores/middleware.js');
const { listarContas, criarConta } = require('./controladores/banco.js');
const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', criarConta);


module.exports = rotas;