const express = require("express");
const router = express.Router();
const db = require("../firebase")
const {getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc, setDoc, queryEqual} = require("firebase/firestore")

router.get('/paymentInfo',  async (req, res, next) => {
    //  updateDoc(doc(db,"Users","testUser1","ShoppingCart",req.body.id),{
    try{
        let response=[]
        let query = await getDoc(doc(db, "Users","Ananya","Checkout","Payment"))
        // let response = query.data();
        return res.json({result:query.data()})
        
    } catch(error){
        console.log(error)
        return res.status(500).json(error);;
    }
    
}
)
router.get('/shippingInfo',  async (req, res, next) => {
    try{
        let query = await getDoc(doc(db, "Users","Ananya","Checkout","Shipping"))
        return res.json({result:query.data()})
        
    } catch(error){
        console.log(error)
        return res.status(500).json(error);;
    }
    
}
)
router.post('/shipping',(req,res,next) =>{
    console.log(req.body)
    const docRef = setDoc(doc(db,"Users","Ananya","Checkout","Shipping"),{
        firstName:"",
        lastName: "",
        street:"",
        city:"",
        state:"",
        zip:""
    });
})

router.post('/payment',(req,res,next) =>{
    console.log(req.body)
    const docRef = setDoc(doc(db,"Users","Ananya","Checkout","Payment"),{
        name:"",
        number:"",
        date:"",
        cvv:"",
        saved:false
    });
})

// // update as more are added
router.put("/shippingUpdates",(req,res,next)=>{
    updateDoc(doc(db,"Users","Ananya","Checkout","Shipping"),{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        street:req.body.street,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip,
    })
})

router.put("/paymentUpdates",(req,res,next)=>{
    console.log(req.body)
    updateDoc(doc(db,"Users","Ananya","Checkout","Payment"),{
        name:req.body.name,
        number:req.body.number,
        date:req.body.date,
        cvv:req.body.cvv,
        saved:req.body.saved
    })
})
module.exports = router;