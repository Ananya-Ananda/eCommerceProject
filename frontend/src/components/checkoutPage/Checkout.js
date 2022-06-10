import axios from 'axios';
import React,{useEffect,useState,Component} from 'react';
import CheckoutBox from './CheckoutBox';

function Checkout(){
    const[payment,setPayment] = useState();
    const[shipping,setShipping] = useState();

    const styles={
        container: {
            margin: "5%",
            alignItems:"center",
            justifyContent:"center"
        }
    }
    async function getPaymentInfo(){
        const response = await fetch('/checkout/paymentInfo');
        const body = await response.json();
        if(body.result === undefined){
            axios.post('/checkout/payment',{
                username:"Ananya",
            })
        }
        setPayment(body.result)
    }

    async function getShippingInfo(){
        const response = await fetch('/checkout/shippingInfo');
        const body = await response.json();
        if(body.result === undefined){
            axios.post('/checkout/shipping',{
                username:"Ananya",
            })
        }
        setShipping(body.result)
    }

    useEffect(() => {
        getPaymentInfo();
        getShippingInfo();
    }, [])
    if(shipping && payment){
        return(
        <div style={styles.container}>
            <CheckoutBox payment={payment} shipping={shipping}/>         
        </div>
    )
    }
}export default Checkout;