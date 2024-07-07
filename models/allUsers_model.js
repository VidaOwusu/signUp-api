import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const UsersSchema = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    email: {type: String, unique:true, required:true},
    password:{type:String, unique:true, required:true}
}, {
    timestamps:true
})

UsersSchema.plugin(toJSON)

export const UsersModel = model('User', UsersSchema);