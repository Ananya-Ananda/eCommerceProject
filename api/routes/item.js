require("dotenv").config();
const {initializeApp} = require("firebase/app")
var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
const {getDocs, collection, doc, getDoc, addDoc, setDoc,  deleteDoc, updateDoc, getFirestore} = require("firebase/firestore")

const api_key = process.env.apiKey;
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

router.get('/:bookId', async (req, res, next) => {
  // const url = "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=" + api_key;
  const url = "https://www.googleapis.com/books/v1/volumes/" + req.params.bookId + "?key=" + api_key;
  console.log(url);
  await fetch(url)
  .catch((err) => console.log(err))
  .then((res) => res.json())
  .then(data => res.status(200).json(data))

})

router.get('/:bookId/quantity', async (req, res, next) => {
  try {
    let query = await getDoc(doc(db, "Users", "testUser1", "ShoppingCart", req.params.bookId))
    // let query = await db.collection('messages').get();
    let response = query;
    // query.forEach((item) => {
    //     response.push({id: item.id, ...item.data()})
    // })
    return res.status(200).json(response)
  }
  catch(error){
    console.log(error);
    return res.status(500).send(error);
  }
})

router.put("/:bookId/quantity/:user",(req,res,next)=>{
  // console.log(req.body)
  updateDoc(doc(db,"Users",req.params.user,"ShoppingCart",req.params.bookId),{
      quantity: req.body.newQuantity
  })
})

router.delete('/:bookId/delete/:user', (req, res, next) => {
  deleteDoc(doc(db,"Users",req.params.user,"ShoppingCart",req.params.bookId))
})

module.exports = router;