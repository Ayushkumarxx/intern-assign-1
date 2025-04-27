import React, { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser, FaUserFriends, FaUsers, FaHeart } from "react-icons/fa";
const Onboard = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <section className="bg-[#FDFBF7] dark:bg-[#0B0809] h-screen w-full  ">
      <main className="flex flex-col max-w-[650px] mx-auto justify-between h-full px-[10px] py-[30px] ">
        <div className="w-full  flex flex-col items-start gap-[36px]  h-full">
          <div className="flex flex-col gap-[2px] w-full">
            <h1 className="text-[24px]  text-[#0B0809] dark:text-[#F5F5F5]  font-[800]">
              Plan Your Journey, Your Way!
            </h1>
            <p className="text-[14px] font-[400] text-[#0B0809] dark:text-[#FDFBF7]">
              Let’s create your personalised travel experience
            </p>
          </div>

          {/* Destination Input */}
          <div className="flex flex-col gap-[10px] w-full">
            <label
              htmlFor="dest"
              className="text-[18px] font-[700] text-[#0B0809] dark:text-[#FDFBF7]"
            >
              Where would you like to go?
            </label>

            <div className="relative w-full">
              <GrLocation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0B0809] dark:text-[#F5F5F5]" />
              <input
                type="text"
                name="dest"
                id="dest"
                className="block dark:bg-[#333333] bg-white w-full dark:text-[#F5F5F5] placeholder-[#F5F5F5] p-[10px] pl-10 rounded-[8px] text-[16px] font-[500]"
                placeholder="Enter your destination"
              />
            </div>
          </div>

          {/* Duration Dropdown */}
          <div className="flex flex-col gap-[10px] w-full">
            <label
              htmlFor="duration"
              className="text-[18px] font-[700] text-[#0B0809] dark:text-[#FDFBF7]"
            >
              How many days do you want to travel?
            </label>

            <div className="relative w-full">
              <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0B0809] dark:text-[#F5F5F5]" />

              {/* Dropdown */}
              <select
                name="duration"
                id="duration"
                className="appearance-none block dark:bg-[#333333] bg-white w-full dark:text-[#F5F5F5] placeholder-[#A3A3A3] p-[10px] pl-10 pr-10 rounded-[8px] text-[16px] font-[500]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select duration
                </option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "day" : "days"}
                  </option>
                ))}
              </select>

              {/* Custom Arrow */}
              <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0B0809] dark:text-[#F5F5F5] pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-[10px] w-full">
            <label className="text-[18px] font-[700] text-[#0B0809] dark:text-[#FDFBF7]">
              Who are you travelling with?
            </label>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "solo", label: "Solo", icon: <FaUser /> },
                { id: "couple", label: "Couple", icon: <FaHeart /> },
                { id: "family", label: "Family", icon: <FaUsers /> },
                { id: "friends", label: "Friends", icon: <FaUserFriends /> },
              ].map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center gap-2 h-[50px] rounded-[8px] border cursor-pointer
              ${
                selectedOption === option.id
                  ? "bg-[#3643FB] text-white border-blue-500"
                  : "border-[#ddd] dark:border-[#555] dark:bg-[#333333] "
              }
              hover:border-[#0B0809] dark:hover:border-[#F5F5F5] transition-all relative`}
                >
                  {/* Radio button */}
                  <input
                    type="radio"
                    id={option.id}
                    name="travelType"
                    value={option.id}
                    onChange={handleSelectionChange}
                    checked={selectedOption === option.id}
                    className="hidden"
                  />

                  {/* Label with Icon and Text */}
                  <label
                    htmlFor={option.id}
                    className="flex items-center gap-2 p-4 rounded-lg cursor-pointer w-full"
                  >
                    <div className="text-[24px] text-[#0B0809] dark:text-[#F5F5F5]">
                      {option.icon}
                    </div>
                    <span className="text-[16px] font-medium text-[#0B0809] dark:text-[#F5F5F5]">
                      {option.label}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full bg-[#3643FB] text-white py-[10px] rounded-[8px]">
          Continue
        </button>
      </main>
    </section>
  );
};

export default Onboard;
