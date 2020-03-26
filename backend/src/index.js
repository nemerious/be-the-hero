/**
* Rota                          | Recursos
* http://localhost:3333/users   | /users
*/

/**
 *Metodos HTTP
 *
 * GET   : Buscar/Listar uma informação no back-end
 * POST  : Criar  uma informação no back-end
 * PUT   : Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros
 *
 * Query: Parâmetros nomeados enviados na rota "?" (Filtros, paginação)
 * Exemplo: http://localhost:3333/users?name=Diego
 *
 * Route Params: Parâmetros utilizados para identificar recursos
 * Exemplo: app.get('/users/:id' ou seja -> http://localhost:3333/users/1
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * SQL: MySQL,SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 */

/**
 * Driver: SELECT * FROM users;
 * Query Builder: table('users').select('*').where
 */

//Route Params
// app.get('/users/:id', (request, response) => {
//   const params = request.params;

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
