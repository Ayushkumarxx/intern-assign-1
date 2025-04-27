import React from "react";
import {

  FaRegHeart,
} from "react-icons/fa";

import { FiHome, FiUser } from "react-icons/fi";
import {
  IoSearch,

} from "react-icons/io5";


import { IoIosAdd } from "react-icons/io";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6 py-2 bg-white dark:bg-[#1D1F24]  flex justify-between items-center z-[100]">
      <div className="w-[48px] h-[48px]  dark:bg-[#D3F462]/20 bg-[#313DDF]/20 rounded-full flex items-center justify-center">
        <FiHome className="text-[24px] dark:text-[#D3F462] text-[#313DDF] " />
      </div>

      <div className="w-[48px] h-[48px]  flex items-center justify-center">
        <IoSearch className="text-[24px] dark:text-[#676D75] " />
      </div>

      <div className="w-[48px] h-[48px] flex items-center justify-center">
        <IoIosAdd className="text-[42px] dark:text-[#D3F462] text-[#313DDF]" />
      </div>

      <div className="w-[48px] h-[48px] flex items-center justify-center">
        <FaRegHeart className="text-[24px] dark:text-[#676D75] " />
      </div>

      <div className="w-[48px] h-[48px] flex items-center justify-center">
        <FiUser className="text-[24px] dark:text-[#676D75] " />
      </div>
    </div>
  );
};

export default BottomNavigation;