import axios from "axios";
const baseUrl = "http://localhost:3000/products";

function getAll() {
   
    return axios.get(baseUrl);
}

function addProduct(newProduct){
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.post(baseUrl , newProduct, config)
}

function editProduct(id, newProduct){
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.put(`${baseUrl}/${id}`, newProduct, config)
}

function deleteProduct(id){
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, addProduct, deleteProduct, editProduct };