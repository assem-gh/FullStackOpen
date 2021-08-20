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
    response.send('./build/static/index.html')
})
// get all persons in db
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        console.log('persons', persons)
        response.json(persons)
    })
})

// get specific  person data by id
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => response.json(person))
        .catch(error => next(error))
})

// delete exist person data
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//update exist person data
app.put('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id, 'id')
    const body = request.body
    const personToAdd = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, personToAdd, { new: true })
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
})

//add new person to the db
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name) response.status(400).json({ error: 'name is missing' })
    if (!body.number) response.status(400).json({ error: 'number is missing' })

    const personToAdd = new Person({
        name: body.name,
        number: body.number,
    })
    personToAdd.save()
        .then(person => response.json(person))
        .catch(error => next(error))
})

//information about db
app.get('/info', (request, response) => {
    Person.countDocuments({}, (err, count) => {
        response.send(`<p>Phonebook has info for ${count} people\n ${new Date}</p> `)
    })
})

// Error handler 
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message });
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen((PORT), () => {
    console.log('server running on ', PORT)
})

