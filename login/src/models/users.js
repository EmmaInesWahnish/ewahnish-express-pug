const mongoose = require("mongoose");
const { Schema, model } = mongoose

const userCollection = 'users';

const UserSchema = new Schema({
    author: {
        email: { type: String, required: true},
        password: { type: String, required: true},
        first_name: { type: String, required: true, max: 100 },
        last_name: { type: String, required: true, max: 100 },
        age: { type: Number, required: false},
    },
})

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});

const UserModel = model(userCollection, UserSchema)

module.exports =  UserModel;