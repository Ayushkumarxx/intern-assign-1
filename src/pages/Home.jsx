import React from "react";
import { FaClock, FaUsers, FaList, FaArrowRight } from "react-icons/fa";
import { GrBook } from "react-icons/gr";

import { IoHome, IoSearch, IoAdd, IoHeart, IoPerson, IoStar } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { FaA } from "react-icons/fa6";
import Exports from "../utils/export";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <button className="flex flex-col items-center">
        <div className="w-6 h-6 text-blue-500">
          <IoHome size={24} />
        </div>
      </button>

      <button className="flex flex-col items-center">
        <div className="w-6 h-6 text-gray-500">
          <IoSearch size={24} />
        </div>
      </button>

      <button className="flex flex-col items-center -mt-5">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
          <IoAdd size={24} />
        </div>
      </button>

      <button className="flex flex-col items-center">
        <div className="w-6 h-6 text-gray-500">
          <IoHeart size={24} />
        </div>
      </button>

      <button className="flex flex-col items-center">
        <div className="w-6 h-6 text-gray-500">
          <IoPerson size={24} />
        </div>
      </button>
    </div>
  );
};

const InfoItem = ({
  icon: Icon, // Icon component passed as prop
  iconBgColor = "dark:bg-[#292929]",
  iconColor = "text-[#D1F462]",
  title,
  subtitle,
  titleColor = "text-white",
  subtitleColor = "text-white",
}) => {
  return (
    <div className="flex items-center gap-1">
      <div
        className={`flex w-[32px] h-[32px] items-center justify-center rounded-full ${iconBgColor}`}
      >
        {Icon && <Icon className={`text-[16px] ${iconColor}`} />}
      </div>
      <div className="flex flex-col">
        <p className={`text-[12px] font-[600] ${titleColor}`}>{title}</p>
        <p className={`text-[10px] font-[400] ${subtitleColor}`}>{subtitle}</p>
      </div>
    </div>
  );
};

const AccommodationCard = () => {
    return (
        <div className="w-[200px] h-[240px] rounded-2xl overflow-hidden dark:bg-[#4D4D4D] border-[1px] border-[#BFBFBF] dark:border-none mb-7">
            <div className="w-full h-[120px] relative ">
                <img src="https://secure.s.forbestravelguide.com/img/properties/Property-AndazTokyoToranomonHills-Hotel-GuestroomSuite-DeluxeAndazLargeKing-HyattCorporation.jpg" alt=""  className="w-full h-full object-cover"/>

                <div className="w-[75px] h-[16px] bg-[#3643FB] p-[2px] rounded-[2px] absolute bottom-1 left-1 flex items-center gap-1">
                  <IoStar  className="text-white text-[10px]"/> <p className="text-white text-[8px]">
                    Very good</p> 
                </div>
            </div>
            
        </div>
    )
};
const Home = () => {
  return (
    <section className="bg-[#FDFBF7] dark:bg-[#0B0809] min-h-screen w-full">
      <div className="flex flex-col max-w-md mx-auto min-h-screen px-4 py-8 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center  pt-2">
          <div>
            <h2 className="text-[24px] font-[800] text-[#333333] dark:text-white">
              Hello Chhavi!
            </h2>
            <p className="text-[16px] font-[500] text-[#333333] dark:text-white">
              Ready for the trip?
            </p>
          </div>
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
            C
          </div>
        </div>

        {/* Upcoming Trip Section */}
        <div className="mt-6">
          <h3 className="text-[18px] font-[700] text-[#333333] dark:text-white mb-3">
            Your Upcoming Trip
          </h3>

          {/* place image box */}
          <div
            className="w-full h-[340px] flex flex-col justify-between  rounded-2xl overflow-hidden relative
          bg-[url(https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg)] bg-cover bg-center bg-no-repeat p-4"
          >
            <div className="flex justify-between z-50">
              <div>
                <h1 className="text-[40px] font-[900] text-[#333333] dark:text-white mb-2 leading-none">
                  TOKYO
                </h1>
                <p className="text-[12px] font-[500] text-[#333333] dark:text-white">
                  27.01.2025 - 02.02.2025
                </p>
              </div>
              <div>
                <GoArrowUpRight className="text-[#333333] dark:text-white text-[26px]" />
              </div>
            </div>

            <div className="flex justify-between z-50">
              <InfoItem
                icon={FaClock} // Pass icon as prop
                title="8 Days" // Pass title
                subtitle="Duration" // Pass subtitle
              />
              <InfoItem
                icon={FaUsers} // Pass icon as prop
                title="4 (2M,2F)" // Pass title
                subtitle="Group Size" // Pass subtitle
              />
              <InfoItem
                icon={GrBook} // Pass icon as prop
                title="14" // Pass title
                subtitle="Activities" // Pass subtitle
              />
            </div>

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Bottom Blur */}
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-[1px]"></div>
          </div>
        </div>

        {/* Flight Details Section */}
        <div className="p-2 mt-8 bg-[#3643FB] w-full h-[130px] rounded-2xl overflow-hidden relative">

            <img src={Exports.images.plane} alt=""  className="absolute bottom-[-180px] right-[-160px] -rotate-12 scale-x-[-1]"/>
          <div className="bg-[#313DDF] w-full h-full rounded-2xl flex flex-col justify-between p-[10px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[16px] font-[700] text-white leading-none mb-2">
                  Flight Details
                </h3>
                <p className="text-[14px] font-[500] text-white">
                  26.01.2025, 10:50 am
                </p>
              </div>
              <div className="text-[#D1F462] underline underline-offset-2 text-[12px] leading-none p-0 m-0 ">
                See all
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div>
                <h3 className="text-[16px] font-[700] text-white leading-none">
                  DEL
                </h3>
                <p className="text-[12px] font-[500] text-white">Delhi,India</p>
              </div>
              <div>
                <FaArrowRight className=" text-[16px] text-white" />
              </div>
              <div>
                <h3 className="text-[16px] font-[700] text-white leading-none">
                  NRT
                </h3>
                <p className="text-[12px] font-[500] text-white">
                  Narita,Japan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Section */}
        <div className=" mt-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[18px] font-[700] text-gray-900 dark:text-white">
              Accomodation
            </h3>
            <span className="text-[12px] font-[800] text-[#3643FB] dark:text-[#D1F462]">
              See all
            </span>
          </div>

          <div className="flex space-x-3 overflow-x-auto pb-2">
            <AccommodationCard/>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </section>
  );
};

export default Home;
