import axios from "axios";
const baseUrl = "http://localhost:3000/categories";

function getAll() {
   
    return axios.get(baseUrl);
}

function addCategory(newProduct){
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.post(baseUrl,newProduct,config)
}

export default { getAll, addCategory };
