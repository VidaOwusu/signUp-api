import express from 'express'
import { dbConnection } from './config/db.js';
import { signUpRouter } from './routes/signUp_route.js';
import { loginRouter } from './routes/login_route.js';
import expressOasGenerator from "express-oas-generator";
import mongoose from 'mongoose';



const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['signUp', 'login'],
    mongooseModels: mongoose.modelNames(),
});


app.use(express.json());
dbConnection();


app.use(signUpRouter)
app.use(loginRouter);


const PORT = 2000;

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`)
})