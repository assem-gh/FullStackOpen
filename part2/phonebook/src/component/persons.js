import Person from './person'

const Persons = ({ persons, deletEntry }) => {
    console.log(deletEntry)
    return (
        <ul>{persons.map(person => <Person key={person.id} person={person} deletEntry={deletEntry} />)}</ul>)
}



export default Persons