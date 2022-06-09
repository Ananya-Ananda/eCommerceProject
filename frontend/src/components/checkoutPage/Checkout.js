import React from 'react';
import './checkout.css';
import CheckoutBox from './CheckoutBox';

function Checkout(){
    const styles={
        container: {
            margin: "5%",
            alignItems:"center",
            justifyContent:"center"
        }
    }
    return(
        <div style={styles.container}>
            {/* props-> credit card info, if saved*/}
            <CheckoutBox/>
        </div>
    )
}export default Checkout;