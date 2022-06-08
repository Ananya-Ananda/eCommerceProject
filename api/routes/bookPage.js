const express = require("express");
const router = express.Router();
const db = require("../firebase")
const {getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc} = require("firebase/firestore")

router.post('/bookInCart',(req,res,next) =>{
    // console.log(req.body)
    const newBook={
        // title:req.body.author,
        id:req.body.id,
        quantity: req.body.quantity
    }
    addDoc(collection(db,"Users","testUser1","ShoppingCart"),newBook)
    .then(function(docRef){
        // console.log("doc written with ID:",docRef.id)
        res.send(docRef.id)
    })
 
})

// update as more are added
router.put("/quantity",(req,res,next)=>{
    // console.log(req.body)
    updateDoc(doc(db,"Users","testUser1","ShoppingCart",req.body.id),{
        quantity: req.body.quantity
    })
})

router.delete('/delete/:id', (req, res, next) => {
    deleteDoc(doc(db,"Users","testUser1","ShoppingCart",req.params.id))
})
module.exports = router;