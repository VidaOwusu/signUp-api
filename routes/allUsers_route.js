import { Router } from "express";
import { allUsers, deleteUser, getUser, getUsers, updateUser } from "../controllers/allUsers_controller.js";


export const allUsersRouter = Router();

allUsersRouter.post('/users', allUsers);

allUsersRouter.get('/users', getUsers);

allUsersRouter.patch('/users/:id', updateUser);

allUsersRouter.delete('/users/:id', deleteUser);

allUsersRouter.get('/users/:id', getUser);