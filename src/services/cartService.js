import axios from 'axios';

const baseUrl = 'http://localhost:3000/cart';

const  addtocart= ({product,quantity,amount}) => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.post(`${baseUrl}`,{product,quantity,amount}, config);
}
const  getCartItems= () => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.get(`${baseUrl}/user/${window.localStorage.getItem('id')}`, config);
}

const deleteCartItems= (id) => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.delete(`${baseUrl}/${id}`, config);
}

const clearcart = () => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.delete(`${baseUrl}/user/${window.localStorage.getItem('id')}`, config);
}

export default {addtocart,getCartItems, deleteCartItems, clearcart}