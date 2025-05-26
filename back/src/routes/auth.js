import express from "express";
import { login, register, verifycode } from "../controllers/auth.js";
const authRouter = express.Router();


authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.get('/verify/:code',verifycode)


export default authRouter
