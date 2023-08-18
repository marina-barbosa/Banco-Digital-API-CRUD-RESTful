const express = require('express');
const rotas = require('./rotas.js');
const app = express();

app.use(express.json());
app.use(rotas);

app.listen(3000, () => {
    console.log('Server ON.')
});

// representar em R$
// refatorar funções
// padronizar td msg
// usar readFile e writeFile
// consertar transferencias
// formatar data




