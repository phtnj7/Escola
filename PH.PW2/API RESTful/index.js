const express = require('express')
const mongoose = require('mongoose')
const Person = require('./model/Person')

const app = express() 


app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())


app.get('/', (req, res) => {
  res.json({ message: 'Oi Express' })
})


app.post('/person', async (req, res) => {
  const { name, salary, approved } = req.body

  if (!name) {
    return res.status(422).json({ message: 'O nome é obrigatório!' })
  }

  const person = new Person({ name, salary, approved })

  try {
    await person.save()
    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/person', async (req, res) => {
  try {
    const people = await Person.find()
    res.json(people)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/person/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findById(id)
    if (!person) {
      return res.status(404).json({ message: 'Pessoa não encontrada!' })
    }
    res.json(person)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.patch('/person/:id', async (req, res) => {
  const id = req.params.id
  const { name, salary, approved } = req.body

  try {
    const updated = await Person.findByIdAndUpdate(id, { name, salary, approved })
    if (!updated) {
      return res.status(404).json({ message: 'Pessoa não encontrada!' })
    }
    res.json({ message: 'Pessoa atualizada com sucesso!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/person/:id', async (req, res) => {
  const id = req.params.id

  try {
    const deleted = await Person.findByIdAndDelete(id)
    if (!deleted) {
      return res.status(404).json({ message: 'Pessoa não encontrada!' })
    }
    res.json({ message: 'Pessoa deletada com sucesso!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

mongoose.connect('mongodb://localhost:27017/ARQUIVO')
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))
