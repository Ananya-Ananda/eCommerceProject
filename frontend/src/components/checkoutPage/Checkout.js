import axios from 'axios';
import React,{useEffect,useState,useContext} from 'react';
import CheckoutBox from './CheckoutBox';
// ../../contexts/loginContext";

function Checkout(){
    // const { login, setLogin } = useContext(LoginContext);
    // const [isLog, setIsLog] = useState(login.isLogged)
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
        const response = await fetch('http://localhost:9000/checkout/paymentInfo');
        const body = await response.json();
        if(body.result === undefined){
            axios.post('http://localhost:9000/checkout/payment',{
                username:"Ananya",
            })
        }
        setPayment(body.result)
    }

    async function getShippingInfo(){
        const response = await fetch('http://localhost:9000/checkout/shippingInfo');
        const body = await response.json();
        if(body.result === undefined){
            axios.post('http://localhost:9000/checkout/shipping',{
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