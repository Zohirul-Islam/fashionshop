import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    cartItem,
    products,
    getCartAmount,
    delivery_fee,
    backend_url,
    token,
    setCartItem,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  
  const onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = []
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item] > 0){
            const itemInfo = structuredClone(products.find(product=>product._id === items))
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address:formData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee
      }
    

        switch(method){
        case 'cod' :
            const response = await axios.post(backend_url + '/api/order/place',orderData,{ headers: { Authorization: `Bearer ${token}` } })
            if(response.data.success){ 
              setCartItem({});
              navigate('/orders');
            }else{
              toast.error(response.data.message);
            }
          break;

        default:

          break;  
      }  
    } catch (error) {
      
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 border-t min-h-[80vh]"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title txt1={"DELIVERY"} txt2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded px-3.5 w-full py-1.5"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            name="firstName"
            onChange={onChangeHandler}
            required
          />
          <input
            className="border border-gray-300 rounded px-3.5 w-full py-1.5"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            name="lastName"
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded px-3.5 w-full py-1.5"
          type="email"
          placeholder="email address"
          value={formData.email}
          name="email"
          onChange={onChangeHandler}
          required
        />
        <input
          className="border border-gray-300 rounded px-3.5 w-full py-1.5"
          type="text"
          placeholder="Street"
          value={formData.street}
          name="street"
          onChange={onChangeHandler}
          required
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded px-3.5 w-full py-1.5"
            type="text"
            placeholder="City"
            value={formData.city}
            name="city"
            onChange={onChangeHandler}
            required
          />
          <input
            className="border border-gray-300 rounded px-3.5 w-full py-1.5"
            type="text"
            placeholder="State"
            value={formData.state}
            name="state"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded px-3.5 w-full py-1.5"
            type="text"
            placeholder="Zip code"
            value={formData.zipCode}
            name="zipCode"
            onChange={onChangeHandler}
            required
          />
          <input
            className="border border-gray-300 rounded px-3.5 w-full py-1.5"
            type="text"
            placeholder="Country"
            value={formData.country}
            name="country"
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded px-3.5 w-full py-1.5"
          type="number"
          placeholder="phone"
          value={formData.phone}
          name="phone"
          onChange={onChangeHandler}
          required
        />
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title txt1={"PAYEMENT"} txt2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method == "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method == "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method == "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;  
