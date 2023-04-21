import express from "express";
import { login, register } from "../controllers/auth.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router();


router.get("/",(req,res)=>{
    res.render("index")
})

router.get("/contact",(req,res)=>{
    res.render("contact");
})

router.get("/register",(req,res)=>{
    res.render("register");
})


router.get("/login",(req,res)=>{
    res.render("login");
})

router.get("/aboutus",(req,res)=>{
    res.render("aboutus");
})

router.get("/agritech",(req,res)=>{
    res.render("agritech");
})

router.get("/energy",(req,res)=>{
    res.render("energy");
})

router.get("/waste",(req,res)=>{
    res.render("waste");
})

router.get("/education",(req,res)=>{
    res.render("education");
})

router.get("/counselordata",(req,res)=>{
    res.render("counselordata");
})

router.get("/logout",(req,res)=>{
    res.render("index");
})

router.get("/appointment",(req,res)=>{
    if (req.session.isLoggedIn) {
        // Render booking page if user is logged in
        res.render('booking');
      } else {
        // Redirect to login page if user is not logged in
        res.redirect('/login');
      }})

router.post("/register",verifyToken, register)
router.post("/login", login)
// router.post("/login", async (req,res)=>{
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         const useremail = await Register.findOne({email:email});
//         if(useremail.password === password){
//             res.status(201).render("loggedin")
//         }
//         else{
//             const errorMessage = 'Invalid email or password';
//             const script = `<script>alert('${errorMessage}'); window.location.href = '/login';</script>`;
//             res.send(script);

//         }
//     } catch (error) {
//         const errorMessage = 'User not exist';
//         const script = `<script>alert('${errorMessage}'); window.location.href = '/login';</script>`;
//         res.status(400).send(script)
//     }
// })


export default router;
