import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import swaggerUiExpress from "swagger-ui-express";
import specs from "./config/swaggerOptions.js";

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect("mongodb+srv://haiverhercas:12345@haiverhdz.knujl.mongodb.net/userpets?retryWrites=true&w=majority&appName=HaiverHdz")

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

export default app;
