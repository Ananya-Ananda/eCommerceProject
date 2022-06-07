import { useState, setState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
} from "@mui/material";

const HomePage = () => {
  const [books, setBooks] = useState([]);

  const printBooks = async () => {
    fetch("http://localhost:9000/books/")
      .then((res) => res.json())
      .then((books) => {
        setBooks(books.items);
        console.log(books.items);
      });
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
              <Box sx={{ mx: "auto", width: 200, p: 1 }}>
                <Card
                  variant="outlined"
                  style={{ margin: "auto", display: "flex" }}
                >
                  <CardContent sx={{ justifyContent: "center" }}>
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
                      {val.volumeInfo.authors[0]}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default HomePage;
