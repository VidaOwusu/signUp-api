import express from 'express'
import { dbConnection } from './config/db.js';
import { allUsersRouter } from './routes/allUsers_route.js';
import expressOasGenerator from "express-oas-generator";
import mongoose from 'mongoose';



const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['allUsers'],
    mongooseModels: mongoose.modelNames(),
});


app.use(express.json());
dbConnection();


app.use(allUsersRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));


const PORT = 2000;

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`)
})