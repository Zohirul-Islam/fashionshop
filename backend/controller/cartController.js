import userModel from "../models/userModel.js";

// add product to user cart
const addToCart = async (req, res) => {
  try {
    const { userId,itemId,size } = req.body;

    const userData = await userModel.findById(userId);


    let cartData = await userData.cartData 
      if(cartData[itemId]){
        if(cartData[itemId][size]){
          cartData[itemId][size] += 1;
      }else{
        cartData[itemId][size] = 1;
      }
    }else{
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// update user cart
const updateToCart = async (req, res) => {
  try {
    let {userId ,itemId, size, quantity } = req.body;
    

    const userData = await userModel.findById(userId);


    let cartData = await userData.cartData

    // Initialize nested objects if necessary
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log("Cart update error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user cart
const getUserCart = async (req, res) => {
  try {
    const {userId} = req.body // 

    const userData = await userModel.findById(userId);

    

    res.status(200).json({ success: true, cartData:userData.cartData });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, updateToCart, getUserCart };
