const express = require('express');
const rotas = require('./rotas.js');
const app = express();

app.use(express.json());
app.use(rotas);

app.listen(3000, () => {
    console.log('Server ON.')
});


// Criar conta bancária
// Listar contas bancárias
// Atualizar os dados do usuário da conta bancária
// Excluir uma conta bancária
// Depósitar em uma conta bancária
// Sacar de uma conta bancária
// Transferir valores entre contas bancárias
// Consultar saldo da conta bancária
// Emitir extrato bancário

