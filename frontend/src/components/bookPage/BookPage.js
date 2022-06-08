import React,{useState} from 'react'
import CardMedia from '@mui/material/CardMedia';
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

function BookPage(props){
    const { accessToken, setAccessToken } = useContext(AccessTokenContext);
    const [book, setBook] = useState();
    const [count, setCount] = useState(0);
    const [docId, setDocId] = useState("");
    // React.useState(0);
    // get prop+ display whatever
    const addTo = () =>{
       setCount(count + 1);
       if(count+1 === 1){
            axios.post("http://localhost:9000/bookPage/bookInCart",{
                title: "title",
                quantity: 1,
                cost:"10",
                isbn:"000000"
            })
            .then((res) =>setDocId(res.data))
            .catch((err)=> console.log(err))
        }
        else{
            console.log(count+1)
            axios.put("http://localhost:9000/bookPage/quantity",{
                quantity:count+1,
                id:docId
            })
            .catch((err)=> console.log(err))
        }
        // console.log("posted")
    }
    const deleteFrom = () =>{
        setCount(Math.max(count - 1, 0));
        console.log(count -1)
        if(count-1 === 0){
            fetch('http://localhost:9000/bookPage/delete/' + docId,{
                method:"DELETE"
            })
            .catch((err)=> console.log(err))
        }
        else if(count-1 > 0){
            axios.put("http://localhost:9000/bookPage/quantity",{
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
            width: '50%',
            margin:"3%",
        },
        leftPane: {
            width: '50%',
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
            {/* some navbar */}
            <div style={styles.cart}>
                <Button endIcon={<ShoppingCartIcon/>}>Go to cart</Button>
            </div>
            <div style={styles.splitScreen}>
                <div style={styles.leftPane}>
                {/* <img src='https://cdn.pixabay.com/photo/2018/01/03/09/09/book-3057901__340.png'alt="Book Cover" style= {{justifyContent:"center", width: "auto",height:"100%"}}/> */}
                    <CardMedia 
                    sx={{width: "auto",height:"100%"}}
                        component="img"
                        alt="book cover"
                        image=image={book.volumeInfo.imageLinks.extraLarge}/>
                </div>
                <div style={styles.rightPane}>
                    <h1>{book.volumeInfo.title}</h1>
                    <h2>{book.volumeInfo.authors[0]}</h2>
                    <Rating name="read-only" value={3} readOnly />
                    <p>
                    {book.volumeInfo.description}
                    </p>
                    <div style={styles.splitScreen}>
                        <p style={styles.isbn}>
                            ISBN
                        </p>
                        <div style={styles.buttons}>
                            <h2>Price</h2>
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
          </div>
        </div>
      </div>
    );
  }
}
export default BookPage;
