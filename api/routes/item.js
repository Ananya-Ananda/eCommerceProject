require("dotenv").config();
var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
const db = require("./firebase");
const {getDocs, collection, doc, getDoc, addDoc, setDoc,  deleteDoc, updateDoc} = require("firebase/firestore")

const api_key = process.env.apiKey;

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

router.put("/:bookId/quantity",(req,res,next)=>{
  // console.log(req.body)
  updateDoc(doc(db,"Users","testUser1","ShoppingCart",req.params.bookId),{
      quantity: req.body.newQuantity
  })
})

router.delete('/:bookId/delete', (req, res, next) => {
  deleteDoc(doc(db,"Users","testUser1","ShoppingCart",req.params.bookId))
})

module.exports = router;