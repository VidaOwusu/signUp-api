import { Router } from "express";
import { allUsers, deleteUser, getUser, getUsers, updateUser } from "../controllers/allUsers_controller.js";


export const UsersRouter = Router();

UsersRouter.post('/users', allUsers);

UsersRouter.get('/users', getUsers);

UsersRouter.patch('/users/:id', updateUser);

UsersRouter.delete('/users/:id', deleteUser);

UsersRouter.get('/users/:id', getUser);