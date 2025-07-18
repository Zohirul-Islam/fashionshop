import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { shopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const {products,showSearch,search} = useContext(shopContext);
  const [showFilter, setShowfilter] = useState(true);
  const [filterProducts,setfilterProduct] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  /* catagory handler */
  const handleCategoryChange = (e) => {
    if(selectedCategories.includes(e.target.value)){
      setSelectedCategories(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setSelectedCategories(prev=>[...prev,e.target.value])
    }
  }


/* subcategory handler */
const handleSubcategoryChange =(e)=>{
      if(selectedSubcategories.includes(e.target.value)){
      setSelectedSubcategories(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setSelectedSubcategories(prev=>[...prev,e.target.value])
    }
}
const applyFilter = () =>{
  let productCopy = products.slice();
  if(showSearch && search){
    productCopy = productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
  }
  if(selectedCategories.length > 0){
    productCopy = productCopy.filter((item)=>selectedCategories.includes(item.category));
  }
   if(selectedSubcategories.length > 0){
    
    productCopy = productCopy.filter((item)=>selectedSubcategories.includes(item.subCategory));
  }
  
  setfilterProduct(productCopy)
}
const sortProduct = () =>{
 let fpCopy = filterProducts.slice();
  switch(sortType){
    case 'low-high' :
      setfilterProduct(fpCopy.sort((a,b)=>(a.price - b.price)))
      break;
    case "high-low" :
      setfilterProduct(fpCopy.sort((a,b)=>b.price - a.price))
      break;
    default:
      applyFilter()
      break;    
  }
}



useEffect(()=>{
  applyFilter()
},[selectedCategories,selectedSubcategories,search,showSearch]);
useEffect(()=>{
  sortProduct()
},[sortType])

  useEffect(()=>{
    setfilterProduct(products);
  },[]);
  return (
    <div className="min-h-screen flex flex-col gap-1 sm:flex-row sm:gap-10">
      {/* Sidebar */}
      <aside className="min-w-64 p-4">
        <h2 onClick={()=>setShowfilter(!showFilter)} className="text-xl font-bold mb-6 flex gap-2 items-center">Filters
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' :''}`} />
        </h2>
        {/* category filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-2 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="font-medium text-md mb-5">CATAGORIES</p>
          <div className="flex flex-col gap-1 text-sm font-light">
            <p className="flex gap-2">
              <input onChange={handleCategoryChange} type="checkbox" value={"Men"} /> Men
            </p>
            <p className="flex gap-2">
              <input onChange={handleCategoryChange} type="checkbox" value={"Women"} /> Women
            </p>
            <p className="flex gap-2">
              <input onChange={handleCategoryChange} type="checkbox" value={"Kids"} /> Kids
            </p>
          </div>
        </div>
        {/* subcategory */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-2 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="font-medium text-md mb-5">Type</p>
          <div className="flex flex-col gap-1 text-sm font-light">
            <p className="flex gap-2">
              <input onChange={handleSubcategoryChange} type="checkbox" value={"Topwear"} /> Topwear
            </p>
            <p className="flex gap-2">
              <input onChange={handleSubcategoryChange} type="checkbox" value={"Bottomwear"} /> Bottomwear
            </p>
            <p className="flex gap-2">
              <input onChange={handleSubcategoryChange} type="checkbox" value={"Winterwear"} /> Winterwear
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
          <div className="flex justify-between text-base sm:text-2xl mb-4 gap-2">
            <Title txt1={'ALL'} txt2={'COLLECTION'}/>
            <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2 " >
              <option value="relavent">Sort by:relevent</option>
              <option value="high-low">Sort by:high to low</option>
              <option value="low-high">Sort by:low to high</option>
            </select>
          </div>
          {/* map products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {
                filterProducts.map((item,index)=>(
                  <ProductItem key={index} name={item.name} price={item.price} image={item.image} id={item._id} />
                ))
            }
          </div>
      </main>
    </div>
  );
};

export default Collection;
