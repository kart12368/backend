import express from "express";
import dotenv from "dotenv";
import moragan from "morgan";
import mongoose from "mongoose";
import path from "path";
import hbs from "hbs";
import authRoute from "./routes/auth.js";
import errorMonitor from "stream";
import { register } from "./controllers/auth.js"
import { fileURLToPath } from 'url';
import session from 'express-session';


const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
dotenv.config()

const connect = async () => {
try{
    await mongoose.connect(process.env.MONGO);
    console.log("COnnected to mongodb")
}catch(error){
throw error;
}
};

const static_path = path.join(__dirname, "../public/")
const templates_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

//middlewares
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // set this to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 // session expires after 1 day
    }
  }));

app.use(express.json());
// app.use(moragan("dev"))
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", templates_path)
hbs.registerPartials(partials_path)
app.use("/",authRoute)  
    

// app.use(err,req,res,next)=>{
//     const errorStatus = err.status || 500;
//     const errorMessage = err.message || "Something went wrong!"
//     return res.status(errorStatus).json({
//         success:false,
//         status:errorStatus,
//         message:errorMessage,
//         stack:err.stack    

//     })
// }



app.post("/register", register)
// app.post("/register", async (req,res)=>{
//     try {
//         const registerEmployee = new Register({
//             email : req.body.email,
//             fullname: req.body.fullname,
//             password : req.body.password
//         })

//         const registered = await registerEmployee.save();
//         res.status(201).render("index");
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

app.post("/login", async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("loggedin")
        }
        else{
            const errorMessage = 'Invalid email or password';
            const script = `<script>alert('${errorMessage}'); window.location.href = '/login';</script>`;
            res.send(script);

        }
    } catch (error) {
        const errorMessage = 'User not exist';
        const script = `<script>alert('${errorMessage}'); window.location.href = '/login';</script>`;
        res.status(400).send(script)
    }
})


app.listen(port,()=>{
    connect()
    console.log(`Server is running at port number ${port}`)
})