import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider'
import { Autocomplete } from '@mui/material';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

const usStates = ['AL','AK','AZ','AR','CA','CO','CT','DE',
'FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
'VA','WA','WV','WI','WY'
];

const styles ={
    split: {
        flex:"1",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
    },
    container:{
        marginLeft:"20%",
        marginRight:"20%",
        padding:'3%',
        boxShadow: '0px 0px 15px #67696b',
        borderRadius:"8%"
    },
    twoTxt:{
        margin:"1%",
        backgroundColor: 'white', 
        width:"48%"
    },
    fullWidthTxt:{
        margin:"1%",
        backgroundColor: 'white',
        width:"98%"
    },
    threeTxt:{
        margin:"1%",
        backgroundColor: 'white', 
        width:"31%"
    },
}
function CheckoutBox (props){ 
    // shipping info
    // const [payment,setPayment] = useState(props.payment);
    const {shipping,payment} = props;
    const [firstName,setFirstName]=useState(shipping.firstName);
    const [lastName,setLastName]=useState(shipping.lastName);
    const [street,setStreet]=useState(shipping.street);
    const [city,setCity]=useState(shipping.city);
    const [state,setState]=useState(shipping.state);
    const [zip,setZip]=useState(shipping.zip);
    
    // payment info
    const [fullName,setFullName] = useState(payment.name)
    const [cardNum,setCardNum]=useState(payment.number);
    const [eDate,setEDate]=useState(payment.date);
    const [cvv,setCVV]=useState(payment.cvv);

    // save checkout info?
    const[saved,setSaved] = useState(payment.saved);

    const saveInfo=()=>{
        if(saved){
            if(shipping){
                axios.put("http://localhost:9000/checkout/shippingUpdates",{
                    firstName: firstName,
                    lastName: lastName,
                    street:street,
                    city:city,
                    state:state,
                    zip:zip,
                })
            }
            if(payment){
                axios.put("http://localhost:9000/checkout/paymentUpdates",{
                    name:fullName,
                    number:cardNum,
                    date:eDate,
                    cvv:cvv,
                    saved:saved
                })
            }
            if(!(payment || shipping)){
                axios.post("http://localhost:9000/checkout/post",{
                    firstName: firstName,
                    lastName: lastName,
                    street:street,
                    city:city,
                    state:state,
                    zip:zip,
                    name:fullName,
                    number:cardNum,
                    date:eDate,
                    cvv:cvv,
                    saved:saved
                })
            }

            //     axios.post("http://localhost:9000/bookPage/bookInCart",{
            //         quantity: 1,
            //         id:id
            //     })
            //     .then((res) =>setDocId(res.data))
            //     .catch((err)=> console.log(err))
            // }
        }
        // console.log("not saved")
    }
    return(
    <Card style ={styles.container}>
        <div>
            <h2>Shipping Details</h2>
            <div style={styles.split}>
                <TextField style={styles.twoTxt} defaultValue={firstName} onChange={(e)=> setFirstName(e.target.value)} label="First"/>
                <TextField style={styles.twoTxt} defaultValue={lastName} onChange={(e)=> setLastName(e.target.value)} label="Last"/>
            </div>
            <TextField  style={styles.fullWidthTxt} defaultValue={street} onChange={(e)=> setStreet(e.target.value)} label="Street"/>
            <div style={styles.split}>
                <TextField style={styles.threeTxt} defaultValue={city} label="City" onChange={(e)=> setCity(e.target.value)}/>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={usStates}
                    style={styles.threeTxt}
                    defaultValue={state}
                    onChange={(e,value)=> setState(value)}
                    renderInput={(params) => <TextField {...params} label="State"/>}
                />
                <TextField style={styles.threeTxt} defaultValue={zip} label="Zip" onChange={(e)=> setZip(e.target.value)}/>
            </div>
       </div>
       <div>
            <h2>Payment Information</h2>
            <TextField  style={styles.fullWidthTxt} defaultValue={fullName} label="Cardholder's Name"/>
            <TextField style={styles.fullWidthTxt} defaultValue={cardNum} label="Card Number" onChange={(e)=> setCardNum(e.target.value)}/>
            <div style={styles.split}>
                <TextField style={styles.twoTxt} defaultValue={eDate} label="Expiration Date" onChange={(e)=> setEDate(e.target.value)}/>
                <TextField style={styles.twoTxt} defaultValue={cvv} label="CVV"onChange={(e)=> setCVV(e.target.value)}/>
            </div>
            <Divider></Divider>
            <h4>Total Price: $___</h4>
            <FormControlLabel control={<Checkbox checked={saved} onChange={(e)=>setSaved(e.target.checked)}/>} label="Save checkout information" />
            <Button fullWidth variant="contained" onClick={()=>saveInfo()}>Place order</Button>
            {/* onClick-> route to a thank you for your purchase page? */}
       </div>
    </Card>
   );
}export default CheckoutBox;