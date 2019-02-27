// Importando o express router
const express = require("express");
const routes = express.Router();

// Importando o ProductController
const ProductController = require("./controllers/ProductController");

// Importando o auth.js
const authMidleware = require("./middlewares/auth");

// Rotas
// A primeira rota necessita de autenticação por token
routes.get("/products", authMidleware, ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);


// Exportando módulo para server.js
module.exports = routes;