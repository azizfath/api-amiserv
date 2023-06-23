const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    nomor: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

userSchema.pre(
    'save',
    function (next) {
        const user = this
        // console.log(`data user di pre : ac${this}`)
        // console.log(this)
        // console.log(user)
        // const hash = await bcrypt.hash(this.password, 10);
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err)
            // console.log(`salt : ${salt}`)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash;``
                // console.log(hash);
                next();
            })
        })
        // console.log(hash)
    }
)
// verify password 
userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel