import axios from 'axios'
const baseUrl = '/api/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = personToAdd => {
    const request = axios.post(baseUrl, personToAdd)
    return request.then(response => response.data)
}
const remove = (id,) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
const update = (id, personToUpdate) => {
    const request = axios.put(`${baseUrl}/${id}`, personToUpdate)
    return request.then(response => response.data)
}

export { getAllPersons, create, remove, update }