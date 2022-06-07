import {useState, setState} from 'react'
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
} from "@mui/material";
import ShoppingCartPage from '../shoppingCart/ShoppingCartPage';

const HomePage = () => {
  return (
    <div>
      Test
      <ShoppingCartPage login={true} />
    <Grid item xs={2.4}>
      <Box sx={{ mx: "auto", width: 250, p: 1 }}>
        <Card variant="outlined" style={{ margin: "0 auto", display: "flex" }}>
          <CardContent sx={{ justifyContent: "center" }}>
            <img
              src= {'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1333994546l/18517.jpg'}
              height="200"
              width="200"
              alt="artist pic"
            />
            <Typography
              sx={{ fontSize: 18, justifyContent: "center" }}
              color="text.primary"
              gutterBottom
            >
              Title
            </Typography>
            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
              Author
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
    </div>
  );
};

export default HomePage;
