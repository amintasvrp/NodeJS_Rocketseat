// Importando JWT
const jwt = require("jsonwebtoken");

// Importando auth.json
const authConfig = require("../config/auth.json");

// Exportando a autenticação para routes.js
module.exports = (req, res, next) => {
    // Obtendo cabeçalho authorization com token
    const authHeader = req.headers.authorization;

    // Verificando se existe o cabeçalho authorization
    if(!authHeader) 
        return res.status(401).send({ error: "No Token Provided" });

    // Verificando se respeita o formato: Bearer token
    const parts = authHeader.split(" ");

    if(!parts.length === 2)
        return res.status(401).send({ error: "Token error" });

    const [scheme, token] = parts;

    //Usando Regex para verificar se começa com Bearer

    if(! /^Bearer$/i.test(scheme))
        return res.status(401).send({ error: "Token Malformatted" });

    //Autenticando o token com o auth.secret e verificando a validade    
    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if(error) 
            return res.status(401).send({ error: "Token Invalid" });
        return next();
    });


}