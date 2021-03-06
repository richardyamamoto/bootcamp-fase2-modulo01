const express = require("express");

const server = express();
//Permite que o express leia JSON nas requisições
server.use(express.json());

//localhost/3000/teste

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "nome": "Richard", "email":"teste@.com.br"}

//CRUD - Create, Read, Update, Delete

const users = ["Richard", "Amanda", "Paulo"];

//Criando middleware global
// //Manipulam as requisições de alguma forma

server.use((req, res, next) => {
  //Middleware de log das requisições
  console.time("Request");
  console.log("Requisição foi chamada");
  console.log(`Método: ${req.method}; URL: ${req.url} `);

  next();
  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exists!" });
  }
  req.user = user;
  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  // return res.send("Para mandar texto");
  //Desestruturação
  const { index } = req.params;
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send("Usuário deletado com sucesso!");
});

server.listen(3001);
