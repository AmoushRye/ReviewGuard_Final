const express = require('express');
const { registerCtrl, loginctrl, userDetailsCtrl, profileCtrl, updatePasswordCtrl, updateUserCtrl, logoutCtrl } = require('../../controllers/users/users');
const protected = require('../../middlewares/protected');
const userRoutes = express.Router();
const path = require('path');
// const pickle = require('pickle');
// const model = pickle.load('model.pkl');
//const { PythonShell } = require('python-shell');

// let model;
// PythonShell.run('load_model.py', null, function (err, result) {
//     if (err) throw err;
//     // The result should contain the loaded model
//     model = result[0];
// });

//render result page
userRoutes.get('/result',(req, res)=>{
    res.render("result.ejs");
});

// function classify_review(review_text) {
//     // Implement your review classification logic here
//     const prediction = model.predict([review_text]);
//     return prediction[0];
// }

userRoutes.post('/result', async (req, res) => {
    try {
        // Extract the review text from the form data
        //const reviewText = req.body.text;

        // Process the review text (e.g., perform classification)
        //const prediction = classify_review(reviewText);

        // Render the result page with the prediction
        res.render("result.ejs");
    } catch (error) {
        // Handle any errors
        console.error("Error processing result:", error);
        res.status(500).send("Internal Server Error");
    }
});

//render login form
userRoutes.get('/login',(req, res)=>{
    res.render("login.ejs", {
        error:"",
    });
});

//render about page
userRoutes.get('/about',(req, res)=>{
    res.render("about.ejs", {
        error:"",
    });
});

//render model page
userRoutes.get('/model',(req, res)=>{
    res.render("home.ejs");
});


userRoutes.get('/aboutLogin',(req, res)=>{
    res.render("aboutLogin.ejs", {
        error:"",
    });
});

//render register form
userRoutes.get('/register',(req, res)=>{
    res.render("register.ejs", {
        error:"",
    });
});


//update user details
userRoutes.get("/update-user", (req, res)=>{
    res.render('updateUser');
});

//update user password
userRoutes.get("/update-password", (req, res)=>{
    res.render('updatePassword');
});

//POST/api/users/register
userRoutes.post('/register', registerCtrl);

//POST/api/users/login
userRoutes.post('/login', loginctrl);

//GET/api/users/profile
userRoutes.get('/profile-page',protected, profileCtrl);

//PUT/api/users/update-password/:id
userRoutes.put('/update-password', updatePasswordCtrl);

//PUT/api/users/update-user/:id
userRoutes.put('/update-user', updateUserCtrl);

//GET/api/users/logout
userRoutes.get('/logout', logoutCtrl);

//GET/api/users/:id
userRoutes.get('/:id', userDetailsCtrl);

module.exports = userRoutes;