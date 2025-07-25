import express from 'express';
import {
  placeOrderCod,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
} from '../controller/orderController.js'
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/Auth.js';
const orderRouter = express.Router();
// admin feature
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);
//payment feature
orderRouter.post('/place',authUser,placeOrderCod);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);
// user feature
orderRouter.post('/userorders',authUser,userOrders);

export default orderRouter;

