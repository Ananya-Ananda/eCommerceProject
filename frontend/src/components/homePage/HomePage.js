import { useState, setState, useEffect, useContext } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
  CardActionArea,
} from "@mui/material";
import ShoppingCartPage from '../shoppingCart/ShoppingCartPage';
import { AccessTokenContext } from "../../contexts/accessTokenContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../navBar/Navbar";
import ResponsiveAppBar from "../newNav/ResponsiveAppBar";
import Header from "../newNav/Header";
import "./Home.css";
import {Helmet} from "react-helmet";

const HomePage = () => {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("");

  let navigate = useNavigate();

  const printBooks = async () => {
    fetch("/books/" + category)
      .then((res) => res.json())
      .then((books) => {
        setBooks(books.items);
        console.log(books.items);
      });
  };

  const onClick = (event, id) => {
    event.preventDefault();
    setAccessToken(id);
    navigate("/bookpage");
  };

  useEffect(() => {
    console.log(category);
    printBooks();
  }, [category]);
  
  return (
    <>
      {/*<ResponsiveAppBar />*/}
      <Helmet>
        <title>LSE Books - Homepage</title>
      </Helmet>
      <Header />
      <Header getCategory={(val) => setCategory(val)}/>
      <img
        className="home_image"
        src="https://www.kaufmancountylibrary.net/wp-content/uploads/sites/26/2019/04/banner.jpg"
      />
      <Grid container>
        {books.length > 0 &&
          books.map((val, key) => {
            return (
              <Grid item xs={2.2} alignItems= 'center' key={val.id}>
                <Box sx={{ mx: "auto", width: 175, p: 1}}>
                  <Card
                    variant="outlined"
                    style={{ margin: "auto", display: "flex"}}
                  >
                    <CardActionArea onClick={(e) => onClick(e, val.id)}>
                      <CardContent
                        sx={{ justifyContent: "center", height: 250 }}
                      >
                        <img
                          src={val.volumeInfo.imageLinks.thumbnail}
                          height="200"
                          width="150"
                          alt="artist pic"
                        />
                        <Typography
                          sx={{ fontSize: 15, justifyContent: "center" }}
                          color="text.primary"
                          gutterBottom
                        >
                          {val.volumeInfo.title}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 12 }}
                          color="text.primary"
                          gutterBottom
                        >
                          {val.volumeInfo.authors}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default HomePage;
