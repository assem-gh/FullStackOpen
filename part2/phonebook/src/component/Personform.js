const PersonForm = ({ handleSubmit, handleInput, newName, newNumber }) =>
    <form onSubmit={handleSubmit}>
        <div>
            name: <input name='name' value={newName} onChange={handleInput} />
        </div>
        <div>number: <input name='number' value={newNumber} onChange={handleInput} /></div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>


export default PersonForm