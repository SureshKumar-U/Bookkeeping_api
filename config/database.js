const mongoose = require("mongoose")

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    } catch (err) {
        console.log(`Error ocuured while connected to db : ${err}`)

    }

}

module.exports = connectToDB