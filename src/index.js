
const express = require('express');
const cookieParser = require('cookie-parser');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRouter');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');
const PORT = serverConfig.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/auth',authRouter)

app.get('/ping',isLoggedIn, (req, res) => {
console.log(req.body);
console.log(req.cookies);
   return res.json({ message: 'pong' });
});
app.listen(PORT , async()=>{
    await connectDB();
    console.log(`Server is running on port ${PORT}...`);
})
