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

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", (req, res) => {
  // return res.send("Para mandar texto");
  //Desestruturação
  const { index } = req.params;
  return res.json(users[index]);
});

server.post("/users", (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.listen(3000);
