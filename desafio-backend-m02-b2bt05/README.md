

# API Restful de Banco Digital

Projeto API Restful de Banco Digital desenvolvida como desafio do Módulo 02 da Cubos Academy. Esta API permite a criação, gerenciamento e realização de operações bancárias em contas bancárias virtuais.

![GIF](https://github.com/marina-barbosa/desafio-backend-m02-b2bt05/blob/main/gif-crud-banco-digital.gif)

## A API oferece as seguintes funcionalidades:

1. **Criar Conta Bancária**: Permite a criação de uma nova conta bancária associada a um usuário, gerando um número de conta único.

2. **Listar Contas Bancárias**: Recupera a lista de todas as contas bancárias registradas no sistema.

3. **Atualizar Dados do Usuário**: Permite a atualização dos dados do usuário associado a uma conta bancária, como nome, cpf, data de nascimento, telefone, e-mail, e senha.

4. **Excluir Conta Bancária**: Remove uma conta bancária e seus dados do sistema.

5. **Depositar**: Realiza um depósito em uma conta bancária especificada.

6. **Sacar**: Permite o saque de fundos de uma conta bancária, desde que haja saldo disponível.

7. **Transferir**: Realiza a transferência de fundos entre duas contas bancárias.

8. **Consultar Saldo**: Retorna o saldo atual disponível em uma conta bancária.

9. **Emitir Extrato Bancário**: Gera um extrato detalhado das transações realizadas em uma conta bancária.

## Rotas da API

- `POST /contas`: Cria uma nova conta bancária.
- `GET /contas`: Retorna a lista de todas as contas bancárias.
- `PUT /contas/:numero/usuario`: Atualiza os dados do usuário associado a uma conta bancária.
- `DELETE /contas/:numero`: Exclui uma conta bancária.
- `POST /transacoes/depositar`: Realiza um depósito em uma conta bancária.
- `POST /transacoes/sacar`: Permite o saque de fundos de uma conta bancária.
- `POST /transacoes/transferir`: Realiza a transferência de fundos entre duas contas bancárias.
- `GET /contas/saldo`: Consulta o saldo disponível em uma conta bancária.
- `GET /contas/extrato`: Emite um extrato bancário das transações realizadas em uma conta.

## Para executar:

1. Clone este repositório: `git clone ........`
2. Navegue até o diretório do projeto: `cd .........`
3. Instale as dependências: `npm install`
4. Inicie o servidor.
5. A API estará disponível em: `http://localhost:3000` por padrão.

