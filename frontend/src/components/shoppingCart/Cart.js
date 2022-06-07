import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Item from './Item';

function Cart(props) {
    const isLoggedIn = props.login;
    const [cart, setCart] = useState();
    // let cart = [];

    useEffect(() => {
        let subCart = [];
        axios.get("http://localhost:9000/shoppingCart/")
        .then((res) => {
            console.log(res.data);
            res.data.forEach((item) => {
                subCart.push({id: item.id, isbn:item.isbn})
            })
            setCart(subCart);
            // cart = subCart;
            console.log(cart);
        })
        .catch((err) => console.log(err))
    }, []);

    return (
        <div>
            {cart && cart.map((item) => {
                return <Item id={item.id} isbn={item.isbn}></Item>
            })}
        </div>
    );
}

export default Cart;