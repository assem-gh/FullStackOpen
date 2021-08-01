require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons.js')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('personData', (request, response) => JSON.stringify(request.body))

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms ')
)


app.get('/', (request, response) => {
    response.send('<h1>Hello</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        console.log('peraons', persons)
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => response.json(person))
})

app.delete('/api/persons/:id', (request, response) => {

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) response.status(400).json({ error: 'name is missing' })
    if (!body.number) response.status(400).json({ error: 'number is missing' })

    const personToAdd = new Person({
        name: body.name,
        number: body.number,
    })
    personToAdd.save().then(person => response.json(person))
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people<p/><p> ${new Date}</p> `)
    })
})


const PORT = process.env.PORT
app.listen((PORT), () => {
    console.log('server running on ', PORT)
})

