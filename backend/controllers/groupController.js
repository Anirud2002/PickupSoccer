const express = require("express");
const { v4: uuidv4 } = require('uuid');

var router = express.Router();

const mongoose = require("mongoose");

const Group = mongoose.model("Group");
const User = mongoose.model("User");

router.post("/create", async (req, res) => {
    const newGroup = new Group();

    newGroup.groupId = uuidv4();
    newGroup.groupName = req.body.groupName;
    newGroup.inviteLink = "https://google.com";
    newGroup.admins = [{userName: req.user.userName}];
    // admin will be by default the player in the group
    newGroup.players.push({userName: req.user.userName});

    await newGroup.save();

    res.json(newGroup);
})

router.delete("/delete/:groupId", async (req, res) => {
    const group = await Group.findOne({ groupId: req.params.groupId });

    if (!group) {
        return res.status(404).json({ message: "No group found!" });
    }

    // check if user is admin or not
    const isAdmin = group.admins.find(admin => admin.userName == req.user.userName);
    if(!isAdmin) {
        return res.status(400).json({message: "You don't have authorization to do this operation!"})
    }

    await Group.deleteOne({_id: group._id});

    res.status(200).json({message: "Group deleted!"});
})

router.post("/add-user", async (req, res) => {
    const group = await Group.findOne({ groupId: req.body.groupId });

    if (!group) {
        return res.status(404).json({ message: "No group found!" });
    }

    // Using push to add players to the players array
    group.players.push({userName: req.user.userName});
    await group.save();

    // add this groupId into User schema as well
    const user = await User.findOne({userName: req.user.userName});
    user.groupIds.push(req.body.groupId);

    await user.save();

    return res.status(200).json({ message: "Players added successfully", group });
})

router.post("/remove-user", async (req, res) => {
    const group = await Group.findOne({ groupId: req.body.groupId });

    if (!group) {
        return res.status(404).json({ message: "No group found!" });
    }

    // Using filter to remove player from the players array
    group.players = group.players.filter(player => player.userName != req.user.userName );
    await group.save();

    // remove this groupId into User schema as well
    const user = await User.findOne({userName: req.user.userName});
    user.groupIds = user.groupIds.filter(id => id != req.body.groupId);

    await user.save();

    return res.status(200).json({ message: "Players added successfully", group });
})

router.get("/:groupId/players", async (req, res) => {
    const group = await Group.findOne({ groupId: req.params.groupId });

    if (!group) {
        return res.status(404).json({ message: "No group found!" });
    }

    res.status(200).json(group.players);
})

router.post("/:groupId/check-in", async (req, res) => {
    const group = await Group.findOne({ groupId: req.params.groupId });

    if (!group) {
        return res.status(404).json({ message: "No group found!" });
    }

    // Find the player with the username "andy"
    const playerToUpdate = group.players.find(player => player.userName === req.user.userName);
    if (!playerToUpdate) {
        return res.status(404).json({ message: `Player ${req.user.userName} not found in the group!` });
    }

    // Update the checkedIn property
    playerToUpdate.checkedIn = true;

    // Save the updated group
    await group.save();

    return res.status(200).json(playerToUpdate);
})

router.post("/:groupId/check-out", async (req, res) => {
    const group = await Group.findOne({ groupId: req.params.groupId });

    if (!group) {
        return res.status(404).json({ message: "No group found!" });
    }

    // Find the player with the username "andy"
    const playerToUpdate = group.players.find(player => player.userName === req.user.userName);
    if (!playerToUpdate) {
        return res.status(200).json(playerToUpdate);
    }

    // Update the checkedIn property
    playerToUpdate.checkedIn = false;
    if(playerToUpdate.status) {
        playerToUpdate.isAvailable = false;
        playerToUpdate.isTraining = false;
        playerToUpdate.leavingAt = null;
    }

    // Save the updated group
    await group.save();

    return res.status(200).json({ message: "Player checked out successfully", group });
})

router.get("/:groupId/check-in-status", async (req, res) => {
    const group = await Group.findOne({ groupId: req.params.groupId });

    if (!group) {
        return res.status(404).json({ message: "No group found!" });
    }

    // Find the player with the username
    const player = group.players.find(player => player.userName === req.user.userName);
    if (!player) {
        return res.status(404).json({ message: `Player ${req.user.userName} not found in the group!` });
    }

    return res.status(200).json(player.checkedIn);
})

router.post("/:groupId/update-status", async (req, res) => {
    const group = await Group.findOne({ groupId: req.params.groupId });

    if (!group) {
        return res.status(404).json({ message: "No group found!" });
    }

    // Find the player with the username 
    const player = group.players.find(player => player.userName === req.user.userName);
    if (!player) {
        return res.status(404).json({ message: `Player ${req.user.userName} not found in the group!` });
    }

    if(!player.checkedIn) {
        return res.status(500).json({ message: "First Check In!" });
    }

    player.status.isTraining = req.body.isTraining;
    player.status.isAvailable = req.body.isAvailable;
    player.status.leavingAt = req.body.leavingAt;

    await group.save();

    return res.status(200).json(group.players);
})

module.exports = router;