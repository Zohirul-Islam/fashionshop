import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllorders = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
const statusHandler = async (event, orderId) => {
  try {
    const response = await axios.post(
      backendUrl + "/api/order/status",
      { orderId, status: event.target.value },
      { headers: { token } }
    );
    if (response.data.success) {
      fetchAllorders();
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Status update failed.");
  }
};

  useEffect(() => {
    fetchAllorders();
  }, [token]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Order Page</h3>

      <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] font-semibold text-gray-800 text-sm border-b pb-2 mb-2">
        <p>Parcel</p>
        <p>Items & Address</p>
        <p>Order Info</p>
        <p>Amount</p>
        <p>Status</p>
      </div>

      {orders.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-2 items-start text-xs sm:text-sm border-b py-4"
        >
          {/* Parcel Image */}
          <div>
            <img src={assets.parcel_icon} alt="parcel" className="w-8 h-8" />
          </div>

          {/* Items + Address */}
          <div className="space-y-1">
            <div>
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.name} x {item.quantity} <span>({item.size})</span>
                </p>
              ))}
            </div>
            <p className="font-medium">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>{order.address.street}</p>
            <p>
              {order.address.city}, {order.address.state}, {order.address.country},{" "}
              {order.address.zipCode}
            </p>
            <p>Phone: {order.address.phone}</p>
          </div>

          {/* Order Info */}
          <div className="space-y-1">
            <p>Items: {order.items.length}</p>
            <p>Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? "Done" : "Pending"}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>

          {/* Amount */}
          <div className="font-medium">
            {currency}
            {order.amount}
          </div>

          {/* Status Dropdown */}
          <div>
            <select onChange={(event)=>statusHandler(event,order._id)} defaultValue={order.status || "Order Placed"} className="border p-1 rounded">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;

