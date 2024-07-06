import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const loginSchema = new Schema({
    email: {type:String, unique: true, required:true},
    password:{type:String, unique:true, required:true}
}, {
    timestamps:true
})

loginSchema.plugin(toJSON)
export const loginModel = model('login', loginSchema)