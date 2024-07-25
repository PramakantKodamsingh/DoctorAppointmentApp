import mongoose from "mongoose";
import colors from "colors";

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white)

    }catch(error){
        console.log(`Mongodb Server Issue ${error}`.bgRed.white)
    }
}




