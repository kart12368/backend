const express = require("express")
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const path = require("path")
const app = express()
const hbs = require("hbs")
const Register = require("./models/user.js")

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

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", templates_path)
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/register",(req,res)=>{
    res.render("register");
})


app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/aboutus",(req,res)=>{
    res.render("aboutus");
})

app.get("/agritech",(req,res)=>{
    res.render("agritech");
})

app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.get("/education",(req,res)=>{
    res.render("education");
})

app.get("/counselordata",(req,res)=>{
    res.render("counselordata");
})

app.get("/logout",(req,res)=>{
    res.render("index");
})

app.post("/register", async (req,res)=>{
    try {
        const registerEmployee = new Register({
            email : req.body.email,
            fullname: req.body.fullname,
            password : req.body.password
        })

        const registered = await registerEmployee.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error)
    }
})

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