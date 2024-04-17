const bcrypt = require("bcryptjs");
const User = require("../../model/users/users");
const appErr = require("../../utils/appErr,js");

const registerCtrl = async(req, res, next) => {
    const {fullname, email, password} = req.body;
    //check if field is empty
    if(!fullname || !email || !password){
        return res.render('register', {
            error: "All fields are required",
        });
    }
    try{
        //check if user exist
        const userFound = await User.findOne({email});
        if(userFound){
            return res.render('register', {
                error: "User already exists",
            });
        };

        //hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt)

        //register user
        const user = await User.create({
            fullname, 
            email, 
            password: passwordHashed
        });
        //redirect
        res.redirect('/api/users/login');
    } catch(error) {
        res.json(error);
    }
};
const loginctrl = async (req, res, next) => {
    const { email, password } = req.body;
    // Check if fields are empty
    if (!email || !password) {
        return res.render("login", {
            error: "Email and password fields are required",
        });
    }
    try {
        // Check if user exists
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.render("login", {
                error: "Invalid login credentials",
            });
        };
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
            return res.render("login", {
                error: "Invalid login credentials",
            });
        };
        
        // Save user into session
        req.session.userAuth = userFound._id;

        // Redirect to Flask application's URL
        return res.redirect("http://127.0.0.1:5000/");
    } catch (error) {
        res.json(error);
    }
};

module.exports = loginctrl;



const userDetailsCtrl = async(req, res)=>{s
    try{
        //get user id from params
        const userID = req.params.id;
        //find the user
        const user = await  User.findById(userID);
        res.render("updateUser", {
            user,
            error: "",
        });
    } catch(error) {
        res.render("updateUser", {
            error: error.message,
        });
    }
};

const profileCtrl = async(req, res)=>{
    try{
        //get the login user
        const userID = req.session.userAuth;
        //find the user
        const user = await User.findById(userID);
        res.render("profile.ejs", { user });
    } catch(error) {
        res.json(error);
    }
};

const updatePasswordCtrl =  async(req, res, next)=>{
    const {password} = req.body;
    try{
        //check if user is updating the password
        if(password){
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            //update user
            await User.findByIdAndUpdate(req.session.userAuth, {
            password: passwordHashed,
        },{
            new: true,
        });
        }
        //redirect
        res.redirect("/api/users/profile-page");
    } catch(error) {
        return res.render("updatePassword", {
            error: error.message,
        });
    }
};

const updateUserCtrl = async(req, res, next)=>{
    const {fullname, email} = req.body;
    try{
        if (!fullname || !email) {
            return res.render("updateUser", {
                error: "Please provide details",
                user: "",
            });
        }
        //check if email is not taken
        if(email){
            const emailTaken = await User.findOne({ email });
            if(emailTaken){
                return res.render("updateUser", {
                    error: "Email is taken",
                    user: "",
                });
            }
        }

        //update the user
        await User.findByIdAndUpdate(req.session.userAuth,{
            fullname, email,
        },{
            new: true,
        });
        res.redirect("/api/users/profile-page");
    } catch(error) {
        return res.render("updateUser", {
            error: error.message,
            user: "",
        });
    }
};

const logoutCtrl = async(req, res)=>{
    try{
        //destroy session
        req.session.destroy(()=>{
            res.redirect('/api/users/login');
        });
    } catch(error) {
        res.json(error);
    }
}; 

module.exports = {
    registerCtrl, loginctrl, userDetailsCtrl, profileCtrl, updatePasswordCtrl, updateUserCtrl, logoutCtrl
}