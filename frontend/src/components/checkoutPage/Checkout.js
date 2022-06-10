import React,{useEffect,useState} from 'react';
import CheckoutBox from './CheckoutBox';

function Checkout(){
    const[payment,setPayment] = useState([]);
    const[shipping,setShipping] = useState([]);

    const styles={
        container: {
            margin: "5%",
            alignItems:"center",
            justifyContent:"center"
        }
    }
    useEffect(() => {
        async function getPaymentInfo(){
            // const allInfo = [];
            const response = await fetch('http://localhost:9000/checkout/paymentInfo');
            const body = await response.json();
            // allInfo.push(body.result.name)
            // allInfo.push(body.result.number)
            // allInfo.push(body.result.date)
            // allInfo.push(body.result.cvv)
            setPayment(body.result);
        }
        async function getShippingInfo(){
            // const allInfo = [];
            const response = await fetch('http://localhost:9000/checkout/shippingInfo');
            const body = await response.json();
            setShipping(body.result);
        }
        getPaymentInfo();
        getShippingInfo();
    }, [])
    return(
        <div style={styles.container}>
            {/* props-> credit card info, if saved*/}
            <CheckoutBox payment={payment} shipping={shipping}/>
        </div>
    )
}export default Checkout;