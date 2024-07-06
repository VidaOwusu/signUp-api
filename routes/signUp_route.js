import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/signUp_controller.js";


export const signUpRouter = Router();

signUpRouter.post('/signUp', addUser);

signUpRouter.get('/signUp', getUsers);

signUpRouter.patch('/signUp/:id', updateUser);

signUpRouter.delete('/signUp/:id', deleteUser);

signUpRouter.get('/signUp/:id', getUser);