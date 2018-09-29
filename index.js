require('dotenv').config();
console.log(process.env)
const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT;
const app = express();
const Post = require('./models/post')
const fileUpload= require("express-fileupload")
const expressSession = require("express-session")
const connectMongo = require("connect-mongo")
const connectFlash = require("connect-flash")
const edge = require("edge.js")

// CONTROLLERS
const home=require("./controlers/home")
const createPost = require("./controlers/createPost")
const storePost = require("./controlers/storePost")
const getPost = require("./controlers/getPost")
const createUser = require("./controlers/createUser")
const storeUser = require("./controlers/storeUser")
const login = require("./controlers/login")
const loginUser = require("./controlers/loginUser")
const logoutUser = require("./controlers/logoutUser")

//Middle wears
const auth = require("./middlewear/auth")
const redirectIfAuth = require("./middlewear/redirectIfAuth");
//CONNECT DATABASE
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true })
    .then(()=>console.log("Successful connection to the Database"))
    .catch((err)=>console.log(err));
const mongoStore = connectMongo(expressSession);


app.use(connectFlash())
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);
app.use(expressSession({
    secret:process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection:mongoose.connection


    })
}))
app.use('*', (req,res,next)=>{
    edge.global('auth',req.session.userId);
    next()
})

// Home page route
app.get('/',  home);
app.get('/post/new', auth, createPost);
app.post('/post/store', auth, storePost);
app.get('/auth/register', redirectIfAuth,createUser);
app.post('/users/register', redirectIfAuth,storeUser);
app.get('/users/login', redirectIfAuth,login);
app.post('/users/login', redirectIfAuth,loginUser);
app.get('/users/logout', auth,logoutUser);



// About page route

app.get('/about', (req,res) => {
    res.render('about');
})

// Post page route

// app.get('/post', (req,res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/post.html'))
// })
app.get('/posts/:id', getPost)


// Contact page route

// app.get('/contact', (req,res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
// })
app.get('/contact', (req,res) => {
    res.render('contact')
})

app.use((req,res) => {
    res.render('notfound')
})



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}`)
})