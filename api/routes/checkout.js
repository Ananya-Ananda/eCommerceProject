const express = require("express");
const router = express.Router();
const db = require("../firebase")
const {getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc, setDoc} = require("firebase/firestore")

router.get('/paymentInfo/:user',  async (req, res, next) => {
    // console.log(req.params)
    try{
        let response=[]
        let query = await getDoc(doc(db, "Users",req.params.user,"Checkout","Payment"))
        // let response = query.data();
        return res.json({result:query.data()})
        
    } catch(error){
        console.log(error)
        return res.status(500).json(error);;
    }
    
}
)
router.get('/shippingInfo/:user',  async (req, res, next) => {
    try{
        let query = await getDoc(doc(db, "Users",req.params.user,"Checkout","Shipping"))
        return res.json({result:query.data()})
        
    } catch(error){
        console.log(error)
        return res.status(500).json(error);;
    }
    
}
)
router.post('/shipping',(req,res,next) =>{
    // console.log(req.body)
    const docRef = setDoc(doc(db,"Users",req.user,"Checkout","Shipping"),{
        firstName:"",
        lastName: "",
        street:"",
        city:"",
        state:"",
        zip:""
    });
})

router.post('/payment',(req,res,next) =>{
    // console.log(req.body)
    const docRef = setDoc(doc(db,"Users",req.user,"Checkout","Payment"),{
        name:"",
        number:"",
        date:"",
        cvv:"",
        saved:false
    });
})

// // update as more are added
router.put("/shippingUpdates",(req,res,next)=>{
    // console.log(req.body.user)
    updateDoc(doc(db,"Users",req.body.user,"Checkout","Shipping"),{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        street:req.body.street,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip,
    })
})

router.put("/paymentUpdates",(req,res,next)=>{
    // console.log(req.user)
    updateDoc(doc(db,"Users",req.body.user,"Checkout","Payment"),{
        name:req.body.name,
        number:req.body.number,
        date:req.body.date,
        cvv:req.body.cvv,
        saved:req.body.saved
    })
})

// router.get('/delete/:user', async (req, res, next) => {
//     const docs = await getDocs(collection(db,"Users",req.params.user,"ShoppingCart"))
//     docs.forEach((doc) => 
//      deleteDoc(doc.data().id)
//     // console.log(doc.data().id)
//     )
    
// })
module.exports = router;