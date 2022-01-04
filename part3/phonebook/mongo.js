const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Add new person: node mongo.js <password> <name> <number>\nshow all persons: node mongo.js password')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]
console.log('name', personName)

const url = `mongodb+srv://asem259:${password}@cluster0.wohaa.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(result => console.log('connected to MongoDB'))
  .catch(err => console.log(err))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// if provide name and number create new person and added to database
if (personName && personNumber) {
  const person = new Person({
    name: personName,
    number: personNumber
  })
  person.save()
    .then(result => {
      console.log(`added ${result.name} to phonebook`)
      mongoose.connection.close()
    })
    .catch(err => {
      console.error(err)
    })
}

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}