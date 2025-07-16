import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div >
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perspiciatis sunt at, soluta fugiat mollitia error aut voluptatibus
            dolore nulla esse suscipit eligendi a adipisci quos, veniam nisi
            numquam! Praesentium voluptate modi, accusantium nulla dignissimos
            aliquid illum dolorem consectetur ea, porro atque iste tempora
            aspernatur harum! Doloribus magnam doloremque architecto qui?
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-400">
            <li>+1-212-456-7890</li>
            <li>contact@bijoy.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ bijoy.com - All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
