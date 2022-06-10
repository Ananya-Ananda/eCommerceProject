const express = require("express");
const router = express.Router();
const db = require("../firebase")
const {collection, addDoc, deleteDoc, doc, updateDoc} = require("firebase/firestore")

router.post('/bookInCart/:user',(req,res,next) =>{
    // console.log(req.body)
    const newBook={
        // title:req.body.author,
        id:req.body.id,
        quantity: req.body.quantity
    }
    addDoc(collection(db,"Users",req.params.user,"ShoppingCart"),newBook)
    .then(function(docRef){
        // console.log("doc written with ID:",docRef.id)
        res.send(docRef.id)
    })
 
})

// update as more are added
router.put("/quantity/:user",(req,res,next)=>{
    // console.log(req.body)
    updateDoc(doc(db,"Users",req.params.user,"ShoppingCart",req.body.id),{
        quantity: req.body.quantity
    })
})

router.delete('/delete/:id/:user', (req, res, next) => {
    deleteDoc(doc(db,"Users",req.params.user,"ShoppingCart",req.params.id))
})
module.exports = router;