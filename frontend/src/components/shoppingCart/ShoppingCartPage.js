import React, {useState, useEffect} from 'react';
import Cart from './Cart';
import TotalBox from './TotalBox'
import './ShoppingCartPage.css'

function ShoppingCartPage(props) {
    const isLoggedIn = props.login;
    const [total, setTotal] = useState(0);
    
    return (
        <div className='container'>
            <div className='cart'>
                <Cart login={isLoggedIn} getTotal={(newTotal) => setTotal(newTotal)}></Cart>
            </div>
            <div className = 'totalBox'>
                <TotalBox total={total} />
            </div>
        </div>
    );
}

export default ShoppingCartPage;