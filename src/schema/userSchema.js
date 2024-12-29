const moongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new moongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
       minlength: [5, "First Name must be at least 5 characters long"],
       lowercase: true,
       trim: true,
       maxlenght: [20,"First Name must be at most 20 characters long"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],       
       minlength: [5, "Last Name must be at least 5 characters long"],
       lowercase: true,
       trim: true,
       maxlenght: [20,"Last Name must be at most 20 characters long"],
    },
    mobilePhoneNumber: {
        type: String,
        required: [true, "Mobile Number is required"],
        unique: [true, "Mobile Number already exists"],
        trim: true, 
        maxlenght: [10,"Mobile Number must be at most 10 characters long"],
        minlenght: [10,"Mobile Number must be at least 10 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    
}, {timestamps: true});

userSchema.pre('save', async function() {
    //here you can modify your user before it is saved to the database
    console.log("Exceuting pre save hook");
    console.log(this);
    // this.password = bcrypt.hashSync(this.password, 10);
   const hashedPassword = await bcrypt.hash(this.password, 10);
   this.password = hashedPassword;
    console.log("Exceuted pre save hook and exiting");
    console.log(this);
  });

const User = moongoose.model('User', userSchema);// collection name is User

module.exports = User;

 