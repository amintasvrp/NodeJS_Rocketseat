// Importando dependências
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

// Criando Esquema de Produto
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Adicionando plugin do paginate
ProductSchema.plugin(mongoosePaginate);

// Exportando para ProductController.js
mongoose.model("Product", ProductSchema);