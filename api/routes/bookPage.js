const express = require("express");
const router = express.Router();
const db = require("../firebase")
const {getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc} = require("firebase/firestore")

router.post('/bookInCart',(req,res,next) =>{
    console.log(req.body)
    // const newBook={
    //     author:req.body.author,
    //     isbn:req.body.isbn,
    //     quantity: 0
    // }
    // addDoc(collection(db,"Users","testUser1","ShoppingCart",newBook))
    // res.send("recieved");
    // const messageRef = doc(db, "rooms", "roomA", "messages", "message1");
})

// update as more are added
// router.put()

router.get('/cart', async (req, res, next) => {
    // console.log(res.body)
})
module.exports = router;