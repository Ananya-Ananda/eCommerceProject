var express = require('express');
var router = express.Router();
const db = require("./firebase");
const {getDocs, collection, doc, getDoc, addDoc, setDoc,  deleteDoc, updateDoc} = require("firebase/firestore")

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    let query = await getDocs(collection(db, "Users", "testUser1", "ShoppingCart"))
    // let query = await db.collection('messages').get();
    let response = []
    query.forEach((item) => {
        response.push({id: item.id, ...item.data()})
    })
    return res.status(200).json(response)
  }
  catch(error){
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;