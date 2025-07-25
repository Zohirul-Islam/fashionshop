import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
// placing order using cash on method
const placeOrderCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId,{cartData:{}});
    res.json({success:true,message:'order placed'})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
  }
};
// placing order using stripe method
const placeOrderStripe = async (req, res) => {};
// placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {};
//all order data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
  }
};
//all order for frontend user
const userOrders = async (req, res) => {
    try {
  const {userId} = req.body;
  const orders = await orderModel.find({ userId }).sort({ date: -1 });
  res.json({success:true,orders});
    } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
    }
};
//update order status from admin panel
const updateStatus = async (req, res) => {};
export {
  placeOrderCod,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
