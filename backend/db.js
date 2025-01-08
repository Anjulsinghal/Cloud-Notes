const mongoose = require("mongoose");
const mongoURI = `mongodb+srv://anjulsinghal123:gSMKvbSxADuGXeEc@cluster0.iihoayt.mongodb.net/inotebook`;
const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongodb");
  });
};
module.exports = connectToMongo;
