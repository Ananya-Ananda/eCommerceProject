import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Item from './Item';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List'
import { LoginContext } from "../../contexts/loginContext";

function Cart(props) {
    const isLoggedIn = props.login;
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState();
    const { login, setLogin } = useContext(LoginContext);
    // let cart = [];

    useEffect(() => {
        console.log(login)
        let subCart = [];
        axios.get("http://localhost:9000/shoppingCart/" + login.user)
        .then((res) => {
            console.log(res.data);
            res.data.forEach((item) => {
                subCart.push({firestoreId: item.firestoreId, id: item.id, quantity: item.quantity})
            })
            console.log(subCart);
            setCart(subCart);
        })
        .catch((err) => console.log(err))
    }, []);

    const changeTotal = (price) => {
        props.getTotal(newTotal => newTotal + price);
    }

    return (
        // <div>
        //     {cart && cart.map((item) => {
        //         return <Item id={item.id}></Item>
        //     })}
        // </div>

        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Shopping Cart
            </Typography>
            <List dense={false}>
                {cart && cart.map((item) => {
                    return <Item firestoreId={item.firestoreId} id={item.id} quantity={item.quantity} changeTotal={(change) => changeTotal(change)}></Item>
                })}
            </List>
        </Grid>
    );
}

export default Cart;