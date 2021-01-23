const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

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

const user = new User({
    name: "Denis3",
    age: 26,
    email: "punpun1@mail.ru",
    password: "123455635"
})

user.save()
    .then(() => {
        console.log(user);
    }).catch((err) => {
        console.log(err);
    })