import express from 'express';
import { adminLogin, userLogin, userRegister } from '../controller/userController.js';
import adminAuth from '../middlewares/adminAuth.js';

const userRouter = express.Router();

//login user router
userRouter.post('/login',userLogin);
//register user router
userRouter.post('/register',userRegister);
// admin login user router
userRouter.post('/adminlogin',adminLogin)

export default userRouter;