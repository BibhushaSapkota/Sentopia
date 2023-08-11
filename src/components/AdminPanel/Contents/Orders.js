import React, { useState, useEffect } from "react";
import orderService from "../../../services/orderService";
import productService from "../../../services/productService";
import userService from "../../../services/userService";
import './Order.css';

function Orders() {
    const [order, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        orderService.getorders().then((res) => {
            setOrders(res.data.data);
        });

        productService.getAll().then((res) => {
            setProducts(res.data.data);
        });

        userService.getUser().then((res) => {
            setUsers(res.data.data);
        });
    }, []);

    // function to get product name based on product id
    const getProductName = (product) => {
        let productName = "";
    
        products.find((p) => {
            for (let i = 0; i < product.length; i++) {
                
                if (p._id === product[i]) {
                    productName += p.name + ", ";
                }
            }
        });
        return productName;
    }

    const getQuantity = (quantity)=>{
        let qty = "";
        for (let i = 0; i < quantity.length; i++) {
            qty = quantity + "   ";
        }
        return qty;
    }
    const getUsername=(user)=>{
        let username = "";
        users.find((u)=>{
            if(u._id === user){
                username = u.username;
            }});
        return username;
    }

   
        

    return (
        <div className='order-table'>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>User Name</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {order.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{getProductName(order.products)}</td>
                            <td>{getUsername(order.user)}</td> 
                            <td>{getQuantity(order.quantity)}</td>
                            <td>{order.amount}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;