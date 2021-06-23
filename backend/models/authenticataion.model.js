const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const authenticScehma = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },
    salt: String,
    resetPasswordLink: {
        data: String,
        default: ""
    }

}, {
    timeStamp: true
})

authenticScehma.virtual('password').
set(function (password) {
    this.password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function () {
    return this._password
})

authenticScehma.methods = {
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) = ""
    },
    encryptPassword: function (password) {
        if (!password) return ""
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (err) {
            return "";
            console.log(err)
        }
    },
    authenticate:function(plainpassword){
        return this.encryptPassword(plainpassword)
    }
}