const express = require('express')
const mongo = require('mongoose')
const app = express()

app.use(express.json())

mongo.connect('mongodb://127.0.0.1/crud')
.then(() => console.log('mongo...'))

let User = mongo.model('usuarios', new mongo.Schema({
    name: String,
    email: String,
    password: String
}))

app.post('/criando', (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    User.create({
        name,
        email,
        password,
    }).then(() => {
        res.send({ message: "Os dados foram salvos!" })
    }).catch(err => res.send({ message: err }))
})
app.get('/mostrar/:name', async (req, res) => {
    const dados = await User.find({ name: req.params.name })
        res.send({ message: "seus dados estão ok", dados })
    })
app.delete('/apagar/:name', async (req, res) => {
    await User.deleteOne({ name: req.params.name })
    res.send({ message: "dados deletados com sucesso, usuario!" })
})
app.put('/update/:name', async (req, res) => {
    await User.findOneAndUpdate({ name: req.params.name }, req.body)    
    res.send({ message: "OK, seus dados foram atualizados!!"})
})

app.use((req, res) => {
    res.send({ message: 'Rota não encontrada!' })
})

app.listen(8080, () => console.log('server em rota'))