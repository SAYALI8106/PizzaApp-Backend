const { findUser } = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");
async function loginUser(authDetails){
   const email = authDetails.email;
   const plainPassword = authDetails.password;

   const user = await findUser({ email });

   if(!user){
       throw {
           reason: 'User with the given email does not exist',
           status: StatusCodes.NOT_FOUND
       }
   }


   const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);
   if(!isPasswordValidated){
       throw {  message: 'Invalid password, please try again', status: StatusCodes.UNAUTHORIZED };
       }

    const  token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    return token;

} 

    module.exports = {
        loginUser
    };