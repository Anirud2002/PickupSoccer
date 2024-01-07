const {Schema, default: mongoose} = require("mongoose");

let UserSchema = new Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    passwordHash: {type: String, required: true},
    passwordSalt: {type: String, required: true},
    contactNumber: {type: String},
    email: {type: String},
    groupIds: {type: [String]},
});

mongoose.model("User", UserSchema);