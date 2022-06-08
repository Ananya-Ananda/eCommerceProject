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
import { AccessTokenContext } from "../../contexts/accessTokenContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const [books, setBooks] = useState([]);

  let navigate = useNavigate(); 
  
  const printBooks = async () => {
    fetch("http://localhost:9000/books/")
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
    printBooks();
  }, []);
  return (
    <Grid container>
      {books.length > 0 &&
        books.map((val, key) => {
          return (
            <Grid item xs={1.6} key={val.id}>
              <Box sx={{ mx: "auto", width: 175, p: 1 }}>
                <Card
                  variant="outlined"
                  style={{ margin: "auto", display: "flex" }}
                >
                  <CardActionArea onClick={(e) => onClick(e, val.id)}>
                    <CardContent sx={{ justifyContent: "center", height: 250 }}>
                      <img
                        src={val.volumeInfo.imageLinks.thumbnail}
                        height="200"
                        width="150"
                        alt="artist pic"
                      />
                      <Typography
                        sx={{ fontSize: 18, justifyContent: "center" }}
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
  );
};

export default HomePage;
