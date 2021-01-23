const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: "Cat",
        validate(value) {
            if(value.trim().toLowerCase() === "denis"){
                throw new Error("Name can't be Denis")
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min: 12
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/
            if(!passRegex.test(value)){
                throw new Error ("invalid password")
            }
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User
