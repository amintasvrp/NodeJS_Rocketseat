// Importando o mongoose
const mongoose = require("mongoose");

// Importando o Product.js
const Product = mongoose.model("Product");

// Importando o jwt e o secret
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

// Gerando Token
function generateToken(params = {}){
    // Validade: 60 seg
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 60 
    });
}

// Exportando lógicas de negócio (requisições assíncronas) para routes.js
module.exports = {
    async index(req,res){
        // Determinando parâmetro get (/products?page=x)
        const { page = 1 } = req.query ;
        // Realizando paginação
        const products = await Product.paginate({}, { page , limit: 10});
        // Retornando json
        return res.json(products);
    },

    async show(req, res){
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },

    // Gerando token ao criar produto
    async store(req, res){
        const product = await Product.create(req.body);
        return res.send({ 
            product: product,
            token: generateToken({ id: product.id})
        });
    },

    async update(req, res){
        const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        return res.json(product);
    },

    async destroy(req, res){
        await Product.findOneAndDelete({_id: req.params.id});
        return res.send();    
    }

};
