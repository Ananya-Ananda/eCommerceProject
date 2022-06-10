require("dotenv").config()
const {initializeApp} = require("firebase/app")
const express = require("express");
const router = express.Router();
const {getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc, getFirestore} = require("firebase/firestore")

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

router.get('/password/:username', async(req,res,next) => {
    const document = await getDoc(doc(db,"Users",req.params.username))
    //console.log(document.data().password)
    res.json({password: document.data().password})
})



module.exports = router;
