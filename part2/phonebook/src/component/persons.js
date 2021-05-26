import Person from './person'

const Persons = ({ persons }) => {
    return (
        <ul>{persons.map(person => <Person person={person} />)}</ul>)
}



export default Persons