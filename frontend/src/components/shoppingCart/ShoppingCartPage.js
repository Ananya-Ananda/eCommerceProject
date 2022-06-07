import React, {useState, useEffect} from 'react';
import Cart from './Cart';

function ShoppingCartPage(props) {
    const isLoggedIn = props.login;
    
    return (
        <Cart login={isLoggedIn}></Cart>
    );
}

export default ShoppingCartPage;