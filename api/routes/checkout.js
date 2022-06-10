require("dotenv").config()
const {initializeApp} = require("firebase/app")
const express = require("express");
const router = express.Router();
const {getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc, setDoc, queryEqual, getFirestore} = require("firebase/firestore")


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
    const docRef = setDoc(doc(db,"Users",req.body.user,"Checkout","Shipping"),{
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
    const docRef = setDoc(doc(db,"Users",req.body.user,"Checkout","Payment"),{
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