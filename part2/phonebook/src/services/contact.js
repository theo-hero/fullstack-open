import axios from 'axios';
const baseUrl = 'http://localhost:3001/people';

const substractData = async (request) => {
    const response = await request;
    return response.data;
}

const getAll = () => substractData(axios.get(baseUrl));

const create = newObject => substractData(axios.post(baseUrl, newObject));

const update = (id, newObject) => substractData(axios.put(`${baseUrl}/${id}`, newObject));

const deleteEntry = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, update, deleteEntry };