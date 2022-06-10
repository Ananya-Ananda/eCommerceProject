import React,{useState,useEffect,useContext} from 'react'
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from "axios";
import { AccessTokenContext } from "../../contexts/accessTokenContext";
import sanitizeHtml from 'sanitize-html';
import { LoginContext } from "../../contexts/loginContext";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";
// import Sanitized from "./Sanitized";

function BookPage(props){
    const {accessToken, setAccessToken } = useContext(AccessTokenContext);
    const [book, setBook] = useState();
    const [count, setCount] = useState(0);
    const [docId, setDocId] = useState("");
    const { login, setLogin } = useContext(LoginContext);
    let navigate = useNavigate();
    // React.useState(0);
    // get prop+ display whatever
    const addTo = (id) =>{
       setCount(count + 1);
       if(count+1 === 1){
            axios.post("http://localhost:9000/bookPage/bookInCart/" + login.user,{
                quantity: 1,
                id:id
            })
            .then((res) =>setDocId(res.data))
            .catch((err)=> console.log(err))
        }
        else{
            console.log(count+1)
            axios.put("http://localhost:9000/bookPage/quantity/" + login.user,{
                quantity:count+1,
                id:docId
            })
            .catch((err)=> console.log(err))
        }
        // console.log("posted")
    }
    const deleteFrom = () =>{
        setCount(Math.max(count - 1, 0));
        // console.log(count -1)
        if(count-1 === 0){
            fetch('http://localhost:9000/bookPage/delete/' + docId + "/" + login.user,{
                method:"DELETE"
            })
            .catch((err)=> console.log(err))
        }
        else if(count-1 > 0){
            axios.put("http://localhost:9000/bookPage/quantity/" + login.user,{
                quantity:count-1,
                id:docId
            })
        }
        // fetch('http://localhost:9000/bookPage/deleteFrom')
        // axios.delete("") if equals 0 -> else put
    }
    const getBook = async () => {
      fetch("http://localhost:9000/books/book/" + accessToken)
        .then((res) => res.json())
        .then((book) => {
          setBook(book);
        console.log(book);
      });
    };

    const toCart = () => {
        navigate("/shoppingcart")
    }

    useEffect(() => {
      getBook();
    }, []);
  
    const styles ={
        splitScreen: {
            flex:"1",
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
        },
        rightPane: {
            width: '65%',
            margin:"3%",
        },
        leftPane: {
            width: '35%',
            margin:"2%",
            alignItems:"center",
            justifyContent:"center",
            height:"80vh"
        },
        buttons: {
            width: '50%',
            margin:"2%",
            display: "flex",
            flexDirection: "column",
            justifyContent:"flex-end",
            alignItems:"flex-end",
        },
        cart:{
            display: "flex",
            justifyContent:"flex-end",
            alignItems:"flex-start",
            padding:"3%"
        },
        isbn:{
            display: "flex",
            justifyContent:"flex-start",
            alignItems:"flex-end",
        }
    }
    // useEffect(() => {
    //     fetch("http://localhost:9000/bookPage/cart")
    //     .then((res) => res.json())
    //     .then((text) => setCart(text.result))
    //     .catch((err) => console.log(err))
    //     console.log("rendering...")
    //   }, [])
    if (book) {
    return(
        <div>
            <Helmet>
                <title>LSE Books - {book.volumeInfo.title}</title>
            </Helmet>
            {/* some navbar */}
            <div style={styles.cart}>
                <Button endIcon={<ShoppingCartIcon/>} onClick = {toCart}>Go to cart</Button>
            </div>
            <div style={styles.splitScreen}>
                <div style={styles.leftPane}>
                {/* <img src='https://cdn.pixabay.com/photo/2018/01/03/09/09/book-3057901__340.png'alt="Book Cover" style= {{justifyContent:"center", width: "auto",height:"100%"}}/> */}
                    <CardMedia 
                    sx={{width: "auto",height:"100%"}}
                        component="img"
                        alt="book cover"
                        image={book.volumeInfo.imageLinks.extraLarge}/>
                </div>
                <div style={styles.rightPane}>
                <Card style={{padding:"5%"}}>
                    <h1>{book.volumeInfo.title}</h1>
                    <h2>{book.volumeInfo.authors[0]}</h2>
                    <Rating name="read-only" value={3} readOnly />
                    
                    <p>
                    {console.log(sanitizeHtml("<img src=x onerror=alert('img') />"))}
                        {/* {console.log(santizeHtml(book.volumeInfo.description))} */}
                    {sanitizeHtml(book.volumeInfo.description)}
                    {/* <Sanitized html="test <b>bold</b>" /> */}
                    </p>
                    </Card>
                    <div style={styles.splitScreen}>
                        <p style={styles.isbn}>
                            Published: {book.volumeInfo.publishedDate}
                            <br></br>
                            ISBN: {book.volumeInfo.industryIdentifiers[0].identifier}
                        </p>
                        <div style={styles.buttons}>
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
                                        addTo(accessToken);
                                    }}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
               </div>
            </div>
          </div>
    );
  }
}
export default BookPage;
