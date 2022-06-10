import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material';
import { LoginContext } from "../../contexts/loginContext";
// import DeleteIcon from '@material-ui/icons/Delete'

function Item(props) {
    const firestoreId = props.firestoreId;
    const id = props.id;
    const [quantity, setQuantity] = useState(props.quantity);
    const [data, setData] = useState();
    const { login, setLogin } = useContext(LoginContext);

    useEffect(() => {
        let subData = [];
        axios.get("http://localhost:9000/item/" + id)
        .then((res) => {
            let item = res.data;
            console.log(item);
            subData = {id: item.id, title: item.volumeInfo.title, authors: item.volumeInfo.authors, image: item.volumeInfo.imageLinks.smallThumbnail, price: item.saleInfo.retailPrice.amount, currency: item.saleInfo.retailPrice.currency};
            setData(subData);
            props.changeTotal(subData.price*quantity);
            // props.changeTotal(5);
        })

        // console.log(firestoreId);
        // axios.get("http://localhost:9000/item/" + firestoreId + "/quantity")
        // .then((res) => {
        //     let num = res.data.quantity;
        //     setQuantity(num);
        // })
    }, [])

    const increaseQuantity = () => {
        axios.put("http://localhost:9000/item/" + firestoreId + "/quantity/" + login.user, {
            newQuantity: quantity + 1
        })
        setQuantity(subQuantity => subQuantity + 1)
        props.changeTotal(data.price)
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            axios.put("http://localhost:9000/item/" + firestoreId + "/quantity/" + login.user, {
                newQuantity: quantity - 1
            })
            setQuantity(subQuantity => subQuantity - 1)
            props.changeTotal(-1*data.price)
        }
    }

    const deleteItem = () => {
        axios.delete("http://localhost:9000/item/" + firestoreId + "/delete/" + login.user)
        props.changeTotal(-1*data.price*quantity);
        setData(null);
        setQuantity(null);
    }

    return data && (
        // <div>
        //     {data? data.title + data.authors + data.image + data.price + data.currency: null}
        // </div>

        <ListItem
        // secondaryAction={
        //     <IconButton edge="end" aria-label="delete">
        //     <DeleteIcon />
        //     </IconButton>
        // }
            sx={{borderTop:1}}
        >
        <ListItemAvatar>
            <Avatar>
            {/* <FolderIcon /> */}
                <img src={data? data.image: null}></img>
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary= {data? data.title: null}
            secondary={data && data.authors ? "By: " + data.authors : null}
        />
        <Typography align='center' sx={{margin:2}}>
            <ListItemText
                primary= {data && quantity? "$" + data.price*quantity: null}
                secondary = {data? "Per unit: $" + data.price: null}
            />
        </Typography>
        <Typography align='center'>
            <Button variant='outlined' onClick={() => increaseQuantity()} color='success'>+</Button>
            <ListItemText
                sx={{border:1}}
                primary={quantity? quantity: null}
            />
            <Button variant='outlined' onClick={() => decreaseQuantity()} color='success'>-</Button>
        </Typography>
        <Button variant='filled' onClick={() => deleteItem()}>Delete</Button>
        </ListItem>
    );
}

export default Item;