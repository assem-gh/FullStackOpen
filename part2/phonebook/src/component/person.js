
const Person = ({ person, deletEntry }) => {

    console.log(deletEntry)
    return <li>{person.name} {person.number} <button onClick={() => deletEntry(person)}>Delete</button></li>

}
export default Person