// import mongoose, { Types } from "mongoose";

// const userSchema = new mongoose.Schema({
//     _id: { type: String, require: true },
//     name: { type: String, require: true },
//     email: { type: String, require: true },
//     image: { type: String, require: true }
// })

// const User = mongoose.model("User", userSchema);

// export default User;



// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },  // ✅ use "required"
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
