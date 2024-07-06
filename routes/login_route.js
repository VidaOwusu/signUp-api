import { Router } from "express";
import { deleteAUser, getAUser, getAllUsers, loginUser, patchUser } from "../controllers/login_controller.js";

export const loginRouter = Router();

loginRouter.post('/login', loginUser);

loginRouter.get('/login', getAllUsers);

loginRouter.patch('/login/:id', patchUser);

loginRouter.delete('/login/:id', deleteAUser);

loginRouter.get('/login/:id', getAUser);