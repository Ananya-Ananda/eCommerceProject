import axios from 'axios';
import React,{useEffect,useState,useContext} from 'react';
import CheckoutBox from './CheckoutBox';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";

function Checkout(){
    const {login, setLogin } = useContext(LoginContext);
    const [isLog, setIsLog] = useState(login.isLogged);
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
        const response = await fetch('/checkout/paymentInfo/' + login.user);
        const body = await response.json();
        if(body.result === undefined){
            axios.post('/checkout/payment',{
                user:login.user,
            })
        }
        setPayment(body.result)
    }

    async function getShippingInfo(){
        const response = await fetch('/checkout/shippingInfo/' + login.user);
        const body = await response.json();
        if(body.result === undefined){
            axios.post('/checkout/shipping',{
                user:login.user,
            })
        }
        setShipping(body.result)
    }

    useEffect(() => {
        getPaymentInfo();
        getShippingInfo();
    }, [])
    if(shipping && payment && login.user){
        return(
        <div style={styles.container}>
             <Button variant='contained'component={Link} to="/shoppingCart">Back to Cart</Button>
            <CheckoutBox payment={payment} shipping={shipping} user={login.user}/>         
        </div>
    )
    }
}export default Checkout;