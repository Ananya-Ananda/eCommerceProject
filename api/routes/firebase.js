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