import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider'
import { Autocomplete } from '@mui/material';

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
const CheckoutBox = (props) => (
    <Card style ={styles.container}>
        <div>
            <h2>Shipping Details</h2>
            <div style={styles.split}>
                <TextField style={styles.twoTxt} label="First"/>
                <TextField style={styles.twoTxt} label="Last"/>
            </div>
            <TextField  style={styles.fullWidthTxt}  label="Street"/>
            <div style={styles.split}>
                <TextField style={styles.threeTxt} label="City"/>
                {/* <TextField style={styles.threeTxt} label="State"/> */}
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={usStates}
                    style={styles.threeTxt}
                    renderInput={(params) => <TextField {...params} label="State" />}
                />
                
                <TextField style={styles.threeTxt} label="Zip"/>
            </div>
       </div>
       <div>
            <h2>Payment Information</h2>
            <TextField  style={styles.fullWidthTxt} label="Cardholder's Name"/>
            <TextField style={styles.fullWidthTxt} label="Card Number"/>
            <div style={styles.split}>
                <TextField style={styles.twoTxt} label="Expiration Date"/>
                <TextField style={styles.twoTxt} label="CVV"/>
            </div>
            <Divider></Divider>
            <h4>Total Price: $___</h4>
            <FormControlLabel control={<Checkbox/>} label="Save credit card information" />
            <Button fullWidth variant="contained">Place order</Button>
       </div>
    </Card>
   );
   export default CheckoutBox;