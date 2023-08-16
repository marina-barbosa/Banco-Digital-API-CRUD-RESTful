const express = require('express');
const validaSenha = require('./controladores/middleware.js');
const { listarContas } = require('./controladores/banco.js');
const rotas = express();

rotas.get('/contas', listarContas);
//rotas.get('/contas', criarConta);


module.exports = rotas;