import express from "express"
import {addToCart,updateToCart,getUserCart} from '../controller/cartController.js'
import authUser from "../middlewares/Auth.js";

const cartRouter = express.Router();

cartRouter.post('/add',authUser,addToCart);
cartRouter.post('/update',authUser,updateToCart);
cartRouter.post('/get',authUser,getUserCart);

export default cartRouter