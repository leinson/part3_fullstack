const express = require('express')
const app = express()


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




app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/info', (req, res) => {
    let person_amount = `Phonebook has info for ${persons.length} people`
    res.send(person_amount + '<br><br>' + new Date())
  })


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
