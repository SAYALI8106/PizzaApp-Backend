const { StatusCodes } = require("http-status-codes");
const { findUser, createUser } = require("../repositories/userRepository");


    async function registerUser(userDetails){
        const user = await findUser({
            email: userDetails.email,
            mobilePhoneNumber: userDetails.mobilePhoneNumber
        });
        // console.log("userService.registerUser", user);
        if(user){
            throw {
                reason: 'User with the given email and mobile number already exists',
                status: StatusCodes.BAD_REQUEST
            }
        }

        const newUser = await createUser({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobilePhoneNumber: userDetails.mobilePhoneNumber,
            email: userDetails.email,
            password: userDetails.password
        });
     
        if(!newUser){
            throw {
                reason: 'Something went wrong, cannot create user',
                status:StatusCodes.INTERNAL_SERVER_ERROR
            }
        }

        return newUser;
       
    }

module.exports = {
    registerUser
};  

 