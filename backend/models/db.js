const mongoose = require('mongoose');

main().then(() => {
    console.log("MongoDb Connection Successfull!")
}).catch(err => console.log("MongoDb Connection Failed!"));

async function main() {
    mongoose.connect(
        "mongodb+srv://anirudshrestha:YbqcdkhWVZLZ9bpG@pickupsoccercluster.khishax.mongodb.net/?retryWrites=true&w=majority",
    )
}

require("./group.model");
require("./user.model");