import { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/Shopcontext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const Bestseller = () => {
  const { products } = useContext(shopContext);
  const [bestSeller, setBestseller] = useState([]);
  const filerProduct = products.filter((item) => item.bestseller);

  useEffect(() => {
    setBestseller(filerProduct);
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-10 text-3xl">
        <Title txt1="BEST" txt2="SELLER" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base font-medium text-gray-700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
          quas modi est quaerat velit vitae nulla labore ipsum quo distinctio.
        </p>
      </div>
      {/* rendering best seller products */}
      <div className="grid grid-col-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-col-5 gap-y-6">
            {
                bestSeller.map((item,index)=>(
                    <ProductItem  key={index} id = {item._id} image={item.image} name={item.name} price ={item.price}/>
                ))
            }
      </div>
    </div>
  );
};

export default Bestseller;
