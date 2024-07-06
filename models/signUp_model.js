import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const signUpSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type: String, unique:true, required:true},
    password:{type:String, unique:true, required:true}
}, {
    timestamps:true
})

signUpSchema.plugin(toJSON)

export const signUpModel = model('signUp', signUpSchema);