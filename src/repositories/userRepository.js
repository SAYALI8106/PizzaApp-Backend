const { StatusCodes } = require("http-status-codes");
const User = require("../schema/userSchema");


    async function findUser(parameters){
        try {
            const response = await User.findOne({...parameters});
        return response;
        } catch (error) {
            console.log(error); 
            throw {
                reason: 'User could not be found',
                status: StatusCodes.INTERNAL_SERVER_ERROR
            }
        }
    }

    async function createUser(userDetails){
        try {
            const response = await User.create(userDetails);
            return response;
        } catch (error) {
            console.log(error);
            throw {
                reason: error.message,  
                status: 500
            }
        }
    }


module.exports ={
    findUser,
    createUser
}; 