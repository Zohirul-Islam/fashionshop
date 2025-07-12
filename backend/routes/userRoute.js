import express from 'express';
import { adminLogin, userLogin, userRegister } from '../controller/userController.js';

const userRouter = express.Router();

//login user router
userRouter.post('/login',userLogin);
//register user router
userRouter.post('/register',userRegister);
// admin login user router
userRouter.post('/adminlogin',adminLogin)

export default userRouter;