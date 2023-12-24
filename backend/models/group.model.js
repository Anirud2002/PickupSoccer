const {Schema, default: mongoose} = require("mongoose");

let AdminSchema = new Schema({
    userName: {type: String, required: true}
})

let AnnouncementSchema = new Schema({
    content: {type: String, required: true},
    postedOn: Date
})

let PlayerStatusSchema = new Schema({
    isTraining: {type: Boolean, default: false},
    isAvailable: {type: Boolean, default: true},
    leavingAt: Date
});

let PlayerSchema = new Schema({
    userName: {type: String, required: true},
    checkedIn: {type: Boolean, default: false},
    status: PlayerStatusSchema
});

let GroupSchema = new Schema({
    groupId: {type: String, required: true},
    groupName: {type: String, required: true},
    inviteLink: {type: String,required: true},
    players: {type: [PlayerSchema]},
    announcements: {type: [AnnouncementSchema]},
    admins: {type: [AdminSchema], required: true}
})

mongoose.model("Group", GroupSchema);