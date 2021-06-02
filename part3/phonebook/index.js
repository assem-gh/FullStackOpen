const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

let personsData = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
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
        "id": 4
    }
]
const generateID = () => Math.floor(Math.random() * (10000 - 5) + 5)
app.get('/', (request, response) => {
    response.send('<h1>Hello</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(personsData)
})

app.get('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    const person = personsData.find(person => person.id === id)
    person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    const persons = personsData.filter(person => person.id !== id)
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(request.body)
    if (!body.name || !body.number) response.status(400).json({ error: 'no input' })
    const personToAdd = {
        name: body.name,
        number: body.number,
        id: generateID()
    }
    personsData = [...personsData, personToAdd]
    response.json(personToAdd)
})

app.get('/info', (request, response) => {
    const personsNumber = personsData.length
    const date = new Date
    response.send(`<p>Phonebook has info for ${personsNumber} people<p/> 
   <p> ${date}</p> `)
})


const PORT = 3001
app.listen((PORT), () => {
    console.log('server running on ', PORT)
})

