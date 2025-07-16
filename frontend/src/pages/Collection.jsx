import { useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Collection = () => {
  const [showFilter, setShowfilter] = useState(true);
  return (
    <div className="min-h-screen flex flex-col gap-1 sm:flex-row sm:gap-10">
      {/* Sidebar */}
      <aside className="min-w-64 bg-gray-800 text-white p-4">
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
              <input type="checkbox" value={"Men"} /> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Women"} /> Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Kids"} /> Kids
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
              <input type="checkbox" value={"Topwear"} /> Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Bottomwear"} /> Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Winterwear"} /> Winterwear
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title txt1={'ALL'} txt2={'COLLECTION'}/>
            <select className="border-2 border-gray-300 text-sm px-2" >
              <option value="relevent">Sort by:relevent</option>
              <option value="relevent">Sort by:high to low</option>
              <option value="relevent">Sort by:low to high</option>
            </select>
          </div>
      </main>
    </div>
  );
};

export default Collection;
