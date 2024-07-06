import mongoose from "mongoose";

const connectionString = process.env.Mongo_Url;
export const dbConnection = async()=>{
await mongoose.connect(connectionString)
console.log('Database is connected successfully')
}

