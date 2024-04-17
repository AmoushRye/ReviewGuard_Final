require("dotenv").config();
const express = require('express');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const userRoutes = require("./routes/users/users");
const historyRoutes = require("./routes/history/history");
const globalErrHandler = require("./middlewares/globalHandler");
const methodOverride = require('method-override');
const app =  express(); //instance of express

require('./config/dbConnect');

//-----------
//middlewares
//-----------

//configure ejs
app.set("view engine", "ejs");

//serve static files
app.use(express.static(__dirname + "/public"));

//method override
app.use(methodOverride("_method"));

//session configuration
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URL,
        ttl: 24*60*60, //1 day
    }),
}));

//save the login user into locals
// app.use((req, res, next)=>{
//     if(req.session.userAuth){
//         res.locals.userAuth = req.session.userAuth;
//     } else {
//         res.locals.userAuth = null;
//     }
//    next();
// });

//pass incoming data
app.use(express.json());
//pass form data
app.use(express.urlencoded({extended: true}))

//render home
app.get('/', (req, res)=>{
    res.render('index.ejs');
})

//user routes
app.use("/api/users", userRoutes);

//history routes
app.use("/api/history", historyRoutes);

//error handler middlewares
app.use(globalErrHandler);



//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`))


