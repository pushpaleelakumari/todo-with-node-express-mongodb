const mongoose = require('mongoose')
const schema = mongoose.Schema;

const todoModel = new schema({
    text: {
        type: String,
        require: true
    }
}, { timestamps: true });

const todos = mongoose.model('Todo', todoModel)

module.exports = todos