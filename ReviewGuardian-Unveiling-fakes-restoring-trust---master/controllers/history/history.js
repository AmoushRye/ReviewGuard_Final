const User = require("../../model/users/users");
const History = require("../../model/history/history");
const appErr = require("../../utils/appErr,js");

const createHistoryCtrl = async (req, res, next) => {
    const {review, result, user} = req.body;
    try {
        if(!review){
            return next(appErr('Field required!!'))
        }

        //find the user
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);

        //create the history
        const historyCreated = await History.create({
            review,
            result, 
            user: userFound._id,
        });

        //push the history into the array of user's post
        userFound.history.push(historyCreated._id);

        //re-save the user
        await userFound.save();

        res.json({
            status: "success",
            data: historyCreated,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const fetchHistoryCtrl = async(req, res, next)=>{
    try{
        //get the id
        //const id = req.params.id;
        //find the history
        //const history = await History.findById(id); 
        const history = await History.find();
        res.json({
            status:'success',
            data: history,
        });
    } catch(error) {
        next(appErr(error.message));
    }
};

const deleteHistoryCtrl = async(req, res, next)=>{
    try{
        //find the history
        const history = await History.findById(req.params.id);

        //check if the history belongs to the user
        if(history.user.toString() !== req.session.userAuth.toString()){
            return next(appErr("You are not allowed to delete this history",403))
        }

        //delete history
        await History.findByIdAndDelete(req.params.id);
        res.json({
            status:'success',
            user: "History deleted successfully",
        });
    } catch(error) {
        next(appErr(error.message));
    }
};

module.exports = {
    createHistoryCtrl, fetchHistoryCtrl, deleteHistoryCtrl
}