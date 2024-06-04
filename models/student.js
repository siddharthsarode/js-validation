const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\d{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    created_at: {
        type: Date,
        default: Date.now,
    }
});

// Generate token using object instance of Student Schema
studentSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        console.log(token);
        return token;
    } catch (error) {
        console.log("method function Error", error);
        throw new Error("Token generation failed");
    }
}

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
