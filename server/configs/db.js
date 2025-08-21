// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         mongoose.connection.on('connected', () => console.log('Database connected'));
//         await mongoose.connect(`${process.env.MONGODB_URI}/quickShow`);
//     } catch (error) {

//         console.error(error.message)
//     }
// }

// export default connectDB;


// configs/db.js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected ....."));
        await mongoose.connect(`${process.env.MONGODB_URI}/quickShow`);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }
};

export default connectDB;



