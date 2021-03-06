import React from 'react';
import {Button} from '@mui/material';
import './TotalBox.css';
import { Stack } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TotalBox(props) {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return (
        <div className='totBoxContainer'>
            <Stack>
                <div className='totBoxText'>
                    Subtotal: ${props.total.toFixed(2)} USD
                </div>
                <div className='totBoxButton'>
                    <Button variant='contained' color='success' component={Link} to="/checkout">Checkout</Button>
                    <Button variant='contained' color='secondary' onClick={handleClick}>Exit Cart</Button>
                </div>
            </Stack>
        </div>
    );
}

export default TotalBox;