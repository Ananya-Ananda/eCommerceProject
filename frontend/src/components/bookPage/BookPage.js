import React,{useState,useEffect, useContext} from 'react'
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AccessTokenContext } from "../../contexts/accessTokenContext";

function BookPage(props){
    const { accessToken, setAccessToken } = useContext(AccessTokenContext);
    const [book, setBook] = useState()
    const [count, setCount] = useState(0);
    // React.useState(0);
    // get prop+ display whatever
    const addTo = () =>{
       setCount(count + 1);
    }
    const deleteFrom = () =>{
        setCount(Math.max(count - 1, 0));
    }

    const getBook = async() => {
        fetch("http://localhost:9000/books/book/" + accessToken)
        .then((res) => res.json())
        .then((book) => {
          setBook(book);
          console.log(book);
        });
    }

    useEffect(() => {
        getBook();
    },[])
    const styles ={
        splitScreen: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-evenly",
        },
        rightPane: {
            width: '50%',
        },
        leftPane: {
            width: '50%',
        },
        buttons: {
            display: "flex",
            flexDirection: "column",
            // justifyContent:"space-evenly",
            alignItems:"flex-end",
        },
        cart:{
            flex: 1,
            alignItems:"flex-end"
        }
    }
    return(
        <div>
            <div style={styles.splitScreen}>
                <div style={styles.rightPane}>
                    <CardMedia 
                    // sx = {{justifyContent:"center", width: "auto", maxHeight: "500px"}}
                        component="img"
                        alt="book cover"
                        image={book.volumeInfo.imageLinks.extraLarge}/>
                </div>
                <div style={styles.rightPane}>
                    <div style={styles.cart}>
                        <Button sx={{justifyContent:"flex-end"}} endIcon={<ShoppingCartIcon/>}>Go to cart</Button>
                    </div>
                    <h1>{book.volumeInfo.title}</h1>
                    <h2>{book.volumeInfo.authors[0]}</h2>
                    <Rating name="read-only" value={3} readOnly />
                    <body>
                        {book.volumeInfo.description}
                    </body>  
                    ISBN
                    <div>
                    <h2>${book.saleInfo.listPrice.amount}</h2>
                    <IconButton aria-label="cart">
                        <Badge badgeContent={count} color="secondary">
                            <ShoppingCartIcon/>
                        </Badge>
                    </IconButton>
                    <ButtonGroup>
                        <Button
                            aria-label="reduce"
                            onClick={() => {
                                deleteFrom();
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </Button>
                        <Button
                            aria-label="increase"
                            onClick={() => {
                                addTo();
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>
                    </div>
               </div>
            </div>
        </div>
    )
}export default BookPage;