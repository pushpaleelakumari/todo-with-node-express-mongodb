const express = require('express')
const mongoose = require('mongoose')
const todos = require('./todoModel.js')

const app = express();
mongoose.connect('mongodb+srv://pushpaleelakumari:fPZuQwsjyUvD5Eq@cluster0.nf9v0sq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((res) => {
    console.log('mongoose is connected')
}).catch((err) => {
    console.log(err, 'hello err')
})

app.use(express.json())

app.post('/todo', (req, res) => {
    console.log(req)
    let { text } = req.body
    if (!text) {
        return app.json({ error: 404, message: "Invalid data given" })
    }
    const newTodo = new todos({
        text
    })
    res.status(200).json({ message: "Success" })
    newTodo.save().then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })

})

app.get('/todos', (req, res) => {
    todos.find()
        .then((response) => {
            console.log(response)
            res.status(200).json({ message: "Success", data: response })
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json({ message: "Data not found" })
        })
})

app.get('/todo/:id', (req, res) => {
    const todoId = req.params.id
    todos.findOne({ _id: todoId }).then((response) => {
        console.log(response)
        res.status(200).json({ message: "Success", data: response })
    }).catch((err) => {
        console.log(err)
        res.status(404).json({ message: "Data not found" })
    })
})

app.delete('/todo/:id', (req, res) => {
    const todoId = req.params.id;
    todos.findOneAndDelete({ _id: todoId })
        .then((response) => {
            res.status(200).json({ message: "Success", data: response })
        }).catch((err) => {
            res.status(500).json({ message: "Failed todo not found" })
        })
})

app.put('/todo/:id', (req, res) => {
    const todoId = req.params.id;
    const { text } = req.body
    todos.findOneAndUpdate({ _id: todoId }, { text: text })
        .then((response) => {
            res.status(200).json({ message: "Success", data: response })
        }).catch((err) => {
            res.status(500).json({ message: "Todo not found" })
        })
})

app.listen(5000, () => {
    console.log('your server is listening the port no 5000')
})