require("dotenv").config()
const {initializeApp} = require("firebase/app")
const express = require("express");
const router = express.Router();
const {collection, addDoc, deleteDoc, doc, updateDoc, getFirestore} = require("firebase/firestore")

const firebaseApp = initializeApp(
    {
      "type": "service_account",
      "projectId": process.env.projectId,
      "private_key_id": process.env.private_key_id,
      "private_key": process.env.private_key,
      "client_email": process.env.client_email,
      "client_id": process.env.firebase_client_id,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": process.env.client_x509_cert_url
    }
  )
const db = getFirestore(firebaseApp)

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