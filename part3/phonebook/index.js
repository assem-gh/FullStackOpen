const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

morgan.token('personData', (request, response) => JSON.stringify(request.body))

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :personData')
)

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
    console.log(request)
    response.json(personsData)
})

app.get('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    const person = personsData.find(person => person.id === id)
    person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    personsData = personsData.filter(person => person.id !== id)
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const body = request.body
    const names = personsData.map(person => person.name)

    if (!body.name) response.status(400).json({ error: 'name is missing' })

    if (!body.number) response.status(400).json({ error: 'number is missing' })

    if (names.includes(body.name)) response.status(400).json({ error: 'name must be unique' })

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


const PORT = process.env.PORT || 3001
app.listen((PORT), () => {
    console.log('server running on ', PORT)
})

