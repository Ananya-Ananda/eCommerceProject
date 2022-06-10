const express = require("express");
const router = express.Router();
const db = require("../firebase")
const {getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc} = require("firebase/firestore")

router.get('/paymentInfo',  async (req, res, next) => {
    //  updateDoc(doc(db,"Users","testUser1","ShoppingCart",req.body.id),{
    try{
        let query = await getDoc(doc(db, "Users","testUser1","Checkout","Payment"))
        // let response = query.data();
        // allInfo.push({id:query.id,...query.data()})
        return res.json({result:query.data()})
        
    } catch(error){
        console.log(error)
        return res.status(500).json(error);;
    }
    
}
)
router.get('/shippingInfo',  async (req, res, next) => {
    try{
        let query = await getDoc(doc(db, "Users","testUser1","Checkout","Shipping"))
        return res.json({result:query.data()})
        
    } catch(error){
        console.log(error)
        return res.status(500).json(error);;
    }
    
}
)
// router.post('/bookInCart',(req,res,next) =>{
//     // console.log(req.body)
//     const newBook={
//         // title:req.body.author,
//         id:req.body.id,
//         quantity: req.body.quantity
//     }
//     addDoc(collection(db,"Users","testUser1","ShoppingCart"),newBook)
//     .then(function(docRef){
//         // console.log("doc written with ID:",docRef.id)
//         res.send(docRef.id)
//     })
 
// })

// // update as more are added
// router.put("/quantity",(req,res,next)=>{
//     // console.log(req.body)
//     updateDoc(doc(db,"Users","testUser1","ShoppingCart",req.body.id),{
//         quantity: req.body.quantity
//     })
// })
module.exports = router;