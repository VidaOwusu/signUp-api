import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const allUsersSchema = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    email: {type: String, unique:true, required:true},
    password:{type:String, unique:true, required:true}
}, {
    timestamps:true
})

allUsersSchema.plugin(toJSON)

export const allUsersModel = model('allUsers', allUsersSchema);