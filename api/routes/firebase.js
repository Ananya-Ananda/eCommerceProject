<<<<<<< HEAD
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
 
const serviceAccount = require("../permissions.json");
 
const app = initializeApp(serviceAccount);
const db = getFirestore(app);
 
module.exports = db;
=======
const express = require("express");
const router = express.Router();
const db = require("../firebase")
const {getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc} = require("firebase/firestore")

router.get('/password/:username', async(req,res,next) => {
    const document = await getDoc(doc(db,"Users",req.params.username))
    //console.log(document.data().password)
    res.json({password: document.data().password})
})



module.exports = router;
>>>>>>> df6968d3062a8b9f9f55f8f74478ce34d5ed8e91
