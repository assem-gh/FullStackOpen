import Person from './Person'

const Persons = ({ persons, deletEntry }) => {
    return (
        <ul>{persons.map(person => <Person key={person.id} person={person} deletEntry={deletEntry} />)}</ul>)
}



export default Persons