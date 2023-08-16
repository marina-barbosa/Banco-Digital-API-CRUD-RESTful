const express = require('express');
const rotas = require('./rotas.js');
const app = express();

app.use(express.json());
app.use(rotas);

app.listen(3000, () => {
    console.log('Server ON.')
});


// Criar conta bancária OK
// Listar contas bancárias OK
// Atualizar os dados do usuário da conta bancária OK
// Excluir uma conta bancária OK
// Depósitar em uma conta bancária OK
// Sacar de uma conta bancária OK
// Transferir valores entre contas bancárias OK
// Consultar saldo da conta bancária OK
// Emitir extrato bancário 

