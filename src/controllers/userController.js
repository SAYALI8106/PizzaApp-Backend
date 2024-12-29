const { StatusCodes } = require("http-status-codes");
const { registerUser } = require("../services/userService");


async function createUser(req, res) {
    // console.log("Controller: createUser called");
    // console.log(req.body);
     //TODO: createUser logic here

    try {
        // console.log("Controller: createUser req.body");
        // console.log(req.body);
        const response = await registerUser(req.body);
    //    console.log("response: " + response);
    //     console.log("UserController: createUser", response);
        return res.status(StatusCodes.CREATED).json({
            message: "Successfully registered the user",
            success: true,
            data: response,
            error: {}
        });
        
    } catch (error) {
         console.log(error);
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.reason,    
            success: false,
            data: {},    
            error: error   
        });
    }
    
    
} 

module.exports = {
    createUser
};