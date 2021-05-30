import axios from 'axios'
const baseUrl = ' http://localhost:3001/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = personToAdd => {
    const request = axios.post(baseUrl, personToAdd)
    return request.then(response => response.data)
}
const removeName = (id,) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


export { getAllPersons, create, removeName }