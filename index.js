const express = require('express')
const app = express()
const morgan = require('morgan')


app.use(express.json())
app.use(morgan('tiny'))

let persons = [
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 6
      },
      {
        "name": "Arto Hellas",
        "number": "0401020304",
        "id": 9
      }
]
const generateId = (max) => {
  return Math.floor(Math.random() * max)
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.number && !body.name) {
    return res.status(400).json({ 
      error: 'name and number missing' 
    })
  }if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  } if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  } if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({ 
      error: 'name already exists' 
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(9999999999999),
  }
  persons = persons.concat(person)
  res.json(person)
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.get('/info', (req, res) => {
  let person_amount = `Phonebook has info for ${persons.length} people`
  res.send(person_amount + '<br><br>' + new Date())
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

