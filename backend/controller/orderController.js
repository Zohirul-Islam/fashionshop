import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency  = 'INR'
const DeliveryCharges = 10
// placing order using cash on method
const placeOrderCod = async (req, res) => {

 try {
    const {userId,items,amount,address} = req.body;
   
    
   

    // Build order object
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Pending", // optional: set default status
      date: Date.now(),
    };
 


    // Save order
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error placing COD order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
      error: error.message,
    });
  }
};

// placing order using stripe method

const placeOrderStripe = async (req, res) => {
  try {
    const {userId, items, amount, address } = req.body;
    const { origin } = req.headers;
 

    // Validate inputs
    if (!userId || !items?.length || !amount || !address || !origin) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Prepare line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: DeliveryCharges * 100,
      },
      quantity: 1,
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&userId=${userId}&address=${encodeURIComponent(
        JSON.stringify(address)
      )}`,
      cancel_url: `${origin}/verify?success=false`,
      line_items,
      mode: 'payment',
      metadata: {
        userId,
        amount,
        address: JSON.stringify(address),
        items: JSON.stringify(items),
      },
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {};
//all order data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//all order for frontend user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  placeOrderCod,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
