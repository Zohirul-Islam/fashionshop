import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from "../context/Shopcontext";
import axios from 'axios';

const Orders = () => {
  const { token, backend_url, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backend_url + '/api/order/userorders',
        {},
        { headers: { token } }
      );
      if(response.data.success){
        let allOrderItems = [];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrderItems.push(item);
          })
        })
        setOrderData(allOrderItems.reverse())
      }

      setOrderData(response.data.orders || []);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token,]);

  return (
    <div className='pt-16 border'>
      <div className="text-2xl">
        <Title txt1={'My'} txt2={'ORDERS'} />
        <div className=''>
          {orderData.length === 0 ? (
            <p className="text-gray-400 py-4">You haven’t placed any orders yet.</p>
          ) : (
            orderData.map((order, index) =>
              order.items.map((item, idx) => (
                <div
                  key={`${index}-${idx}`}
                  className='py-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-t border-b text-gray-700 '
                >
                  <div className='flex items-start gap-6 text-sm'>
                    <img className='w-16 sm:w-20' src={item.image?.[0]} alt={item.name} />
                    <div>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                        <p className='text-lg'>{currency}{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <p className='mt-2'>
                        Date: <span className='text-gray-400'>
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='md:w-1/2 flex justify-between'>
                    <div className="flex items-center gap-2">
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base'>{order.status || "Ready to Ship"}</p>
                    </div>
                    <button onClick={()=>loadOrderData()} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
