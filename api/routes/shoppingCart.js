require("dotenv").config();
const {initializeApp} = require("firebase/app")
var express = require('express');
var router = express.Router();
const {getDocs, collection, doc, getDoc, addDoc, setDoc,  deleteDoc, updateDoc, getFirestore} = require("firebase/firestore")

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

/* GET users listing. */
router.get('/:user', async (req, res) => {
  try {
    let query = await getDocs(collection(db, "Users", req.params.user, "ShoppingCart"))
    // let query = await db.collection('messages').get();
    let response = []
    query.forEach((item) => {
        response.push({firestoreId: item.id, ...item.data()})
        // response.push({firestoreId: item.id})
    })
    return res.status(200).json(response)
  }
  catch(error){
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;