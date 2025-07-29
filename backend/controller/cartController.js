import userModel from "../models/userModel.js";

// add product to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: "Missing itemId or size" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    // Update cart data
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// update user cart
const updateToCart = async (req, res) => {
  try {
    let { itemId, size, quantity } = req.body;
    const userId = req.userId

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

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
    const userId = req.userId; // Extracted from auth middleware (recommended)

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing user ID" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, updateToCart, getUserCart };
