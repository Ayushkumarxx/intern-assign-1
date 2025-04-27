import React, { useEffect, useRef, useState } from "react";
import { FaClock, FaUsers, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { GrBook } from "react-icons/gr";

import { IoStar } from "react-icons/io5";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { GoArrowUpRight } from "react-icons/go";
import Exports from "../utils/export";
import { useLocation } from "react-router-dom";
import { generateTripPlan } from "../utils/fetchData";

/**
 * Loader component
 *
 * This component displays a loading spinner with rotating text phrases while data is being fetched.
 * It uses an interval to change the displayed phrase every 2 seconds.
 *
 * Props:
 * - loading (boolean): Determines whether the loader should be displayed or not.
 */
const Loader = ({ loading }) => {
  // State to keep track of the current phrase index
  const [textIndex, setTextIndex] = useState(0);

  // Array of phrases to display
  const phrases = [
    "Generating content...",
    "This may take less than 10 seconds...",
    "Hold tight, we're almost there!",
    "Fetching the best results for you!",
  ];

  useEffect(() => {
    // Set up an interval to update the text index every 2 seconds
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // If loading is false, render nothing
  if (!loading) return null;

  // Render the loading spinner and the current phrase
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFBF7] dark:bg-[#0B0809]">
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <div className="animate-spin rounded-full h-[50px] [50px] border-4 border-t-4 border-blue-500"></div>
        <span className="text-lg text-gray-700 dark:text-white">
          {phrases[textIndex]}
        </span>
      </div>
    </div>
  );
};
/**
 * InfoItem component
 **/
const InfoItem = ({
  icon: Icon,
  iconBgColor = "dark:bg-[#292929]",
  iconColor = "text-[#D1F462]",
  title,
  subtitle,
  titleColor = "text-white",
  subtitleColor = "text-white",
}) => {
  // Render the icon component
  // Use the iconBgColor and iconColor props to style the icon
  // Return the icon component
  return (
    <div className="flex items-center gap-1">
      <div
        className={`flex w-[32px] h-[32px] items-center justify-center rounded-full ${iconBgColor}`}
      >
        {Icon && <Icon className={`text-[16px] ${iconColor}`} />}
      </div>
      <div className="flex flex-col">
        {/* Render the title and subtitle components */}
        {/* Use the titleColor and subtitleColor props to style the text */}
        <p className={`text-[12px] font-[600] ${titleColor}`}>{title}</p>
        <p className={`text-[10px] font-[400] ${subtitleColor}`}>{subtitle}</p>
      </div>
    </div>
  );
};

/**
 * AccommodationCard component
 *
 * This component renders a card with an image of the hotel, the hotel name, check in and check out dates,
 * the number of nights and the status of the booking.
 *
 */
const AccommodationCard = ({
  imageUrl,
  ratingLabel,
  hotelName,
  checkIn,
  checkOut,
  nights,
  statusText,
}) => {
  return (
    <div className="w-[220px] h-[240px] rounded-2xl overflow-hidden dark:bg-[#4D4D4D] border-[1px] border-[#BFBFBF] dark:border-none  flex flex-col shrink-0">
      <div className="w-full h-[120px] relative">
        <img
          src={imageUrl}
          alt="Hotel"
          className="w-full h-full object-cover"
        />
        <div className="w-[80px] h-[20px] bg-[#3643FB] p-[4px] rounded-[4px] absolute bottom-1 left-2 flex items-center gap-1">
          <IoStar className="text-white text-[14px]" />
          <p className="text-white text-[10px]">{ratingLabel}</p>
        </div>
      </div>

      <div className="p-2 flex flex-col h-full">
        <div className="text-[14px] font-[700] text-[#333333] dark:text-white mb-1">
          {hotelName}
        </div>

        <div className="text-[12px] font-[400] text-[#333333] dark:text-white mb-1">
          <span className="font-[700]">Check in:</span> {checkIn}
        </div>

        <div className="text-[12px] font-[400] text-[#333333] dark:text-white mb-2">
          <span className="font-[700]">Check out:</span> {checkOut}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-[12px] font-[700] text-[#333333] dark:text-white">
            {nights} Nights
          </div>
          <div className="flex items-center text-[12px] font-[700] gap-1.5 text-[#90EB61]">
            <HiOutlineCheckCircle className="text-[18px]" />
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * DaysUi component
 *
 * This component renders a single day in the itinerary with the day, date and month.
 *
 */
const DaysUi = ({ firstDay = false, date, day, month = "" }) => {
  return firstDay ? (
    <div className="flex border-[1px] dark:border-[#D3F462] border-[#313DDF] rounded-[8px] overflow-hidden shrink-0">
      {/* Render the month in a separate column if it is the first day */}
      <div className="w-[28px] h-[45px] dark:bg-[#D3F462] bg-[#313DDF] flex items-center justify-center">
        <span className="text-white dark:text-[#333333] transform -rotate-90 text-[12px] font-[600]">
          {month}
        </span>
      </div>
      <div className="w-[46px] h-[45px] dark:bg-[#333333] bg-[#ffffff] text-[#333333]  dark:text-white flex flex-col items-center justify-between text-[12px] p-2 font-[500] ">
        <p className="leading-none">{day}</p>
        <p className="leading-none"> {date}</p>
      </div>
    </div>
  ) : (
    <div className="w-[46px] h-[45px] dark:bg-[#292929] bg-[#E5E5E5] text-[#808080] rounded-[8px] flex flex-col items-center justify-between text-[12px] p-2 font-[500] shrink-0">
      <p className="leading-none">{day}</p>
      <p className="leading-none"> {date}</p>
    </div>
  );
};
/**
 * ActivityCard component
 *
 * This component renders a single activity card with the following properties:
 *
 * - image: The image of the activity
 * - title: The title of the activity
 * - timing: The timing of the activity
 * - duration: The duration of the activity
 * - pickUp: The pick up location of the activity
 *
 */
const ActivityCard = ({ image, title, timing, duration, pickUp }) => {
  return (
    <div className="w-full h-[140px] rounded-[8px] flex gap-2 dark:bg-[#4D4D4D] border-[1px] border-[#BFBFBF] dark:border-none overflow-hidden">
      <div className="w-[35%] h-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="py-2 pr-2 flex flex-col justify-between w-[65%]">
        <div className="text-[14px] font-[700] text-[#333333] dark:text-white mb-1">
          {title}
        </div>
        <div>
          <div className="text-[12px] font-[400] text-[#333333] dark:text-white mb-1">
            <span className="font-[700]">Timing:</span> {timing}
          </div>
          <div className="text-[12px] font-[400] text-[#333333] dark:text-white mb-1">
            <span className="font-[700]">Duration:</span> {duration}
          </div>
          <div className="text-[12px] font-[400] text-[#333333] dark:text-white mb-1">
            <span className="font-[700]">Pick Up:</span> {pickUp}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Main Home component **/
const Home = () => {
  const location = useLocation();
  const formData = location.state;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tripData, setTripData] = useState(null);

  // Define your callback functions
  const onSuccess = (data) => {
    setTripData(data);
    console.log("Trip Data:", data);
    setLoading(false);
  };

  const onError = (error) => {
    setError(error);

    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await generateTripPlan(formData, onSuccess, onError);
      } catch (error) {
        console.error("Unexpected error: ", error);
        setLoading(false);
      }
    };

    getData();
  }, [formData]);

  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false); // Track if we've scrolled at all
  const containerRef = useRef(null);

  // Function to scroll the container to the right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300, // Adjust this value for scroll speed
        behavior: "smooth",
      });
    }
  };

  // Function to scroll the container to the left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300, // Adjust this value for scroll speed
        behavior: "smooth",
      });
    }
  };

  // Detect scroll position to toggle visibility of scroll buttons
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollLeft;
        setHasScrolled(scrollPosition > 0); // If scrolled by any amount, show left button
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <section className="bg-[#FDFBF7] dark:bg-[#0B0809] min-h-screen w-full">
      <div className="flex flex-col max-w-md mx-auto min-h-screen px-4 pt-8 pb-20 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center  pt-2">
          <div>
            <h2 className="text-[24px] font-[800] text-[#333333] dark:text-white">
              Hello There!
            </h2>
            <p className="text-[16px] font-[500] text-[#333333] dark:text-white">
              Ready for the trip?
            </p>
          </div>
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
            U
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
                <h1 className="text-[40px] font-[900] text-white mb-2 leading-none">
                  {tripData?.tripInfo.city}
                </h1>
                <p className="text-[12px] font-[500] text-white">
                  {tripData?.tripInfo.tripDates.start} -{" "}
                  {tripData?.tripInfo.tripDates.end}
                </p>
              </div>
              <div>
                <GoArrowUpRight className="text-white text-[26px]" />
              </div>
            </div>

            <div className="flex justify-between z-50">
              <InfoItem
                icon={FaClock} // Pass icon as prop
                title={tripData?.tripInfo.duration} // Pass title
                subtitle="Duration" // Pass subtitle
              />
              <InfoItem
                icon={FaUsers} // Pass icon as prop
                title={tripData?.tripInfo.size} // Pass title
                subtitle="Group Size" // Pass subtitle
              />
              <InfoItem
                icon={GrBook} // Pass icon as prop
                title={tripData?.activities.totalCount} // Pass title
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
          <img
            src={Exports.images.plane}
            alt=""
            className="absolute bottom-[-180px] right-[-160px] -rotate-12 scale-x-[-1] max-sm:bottom-[-140px]"
          />
          <div className="bg-[#313DDF] w-full h-full rounded-2xl flex flex-col justify-between p-[10px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[16px] font-[700] text-white leading-none mb-2">
                  Flight Details
                </h3>
                <p className="text-[14px] font-[500] text-white">
                  {tripData?.tripInfo.flightInfo.departureDate},{" "}
                  {tripData?.tripInfo.flightInfo.departureTime}
                </p>
              </div>
              <div className="text-[#D1F462] underline underline-offset-2 text-[12px] leading-none p-0 m-0 ">
                See all
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div>
                <h3 className="text-[16px] font-[700] text-white leading-none">
                  {tripData?.tripInfo.flightInfo.departureAirport}
                </h3>
                <p className="text-[12px] font-[500] text-white">
                  {" "}
                  {tripData?.tripInfo.flightInfo.departureCity},{" "}
                  {tripData?.tripInfo.flightInfo.departureCountry}
                </p>
              </div>
              <div>
                <FaArrowRight className=" text-[16px] text-white" />
              </div>
              <div>
                <h3 className="text-[16px] font-[700] text-white leading-none">
                  {tripData?.tripInfo.flightInfo.arrivalAirport}
                </h3>
                <p className="text-[12px] font-[500] text-white">
                  {tripData?.tripInfo.flightInfo.arrivalCity},{" "}
                  {tripData?.tripInfo.flightInfo.arrivalCountry}
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
            <span className="text-[12px] font-[800] text-[#3643FB] dark:text-[#D1F462] underline underline-offset-2">
              See all
            </span>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={containerRef}
              className="flex flex-nowrap gap-4 overflow-x-auto  scroll-smooth custom-scrollbar"
            >
              {/* Example accommodation cards */}
              {tripData?.accommodations?.map((accommodation, index) => (
                <AccommodationCard
                  key={index} // Unique key for each card
                  imageUrl="https://secure.s.forbestravelguide.com/img/properties/Property-AndazTokyoToranomonHills-Hotel-GuestroomSuite-DeluxeAndazLargeKing-HyattCorporation.jpg"
                  ratingLabel={accommodation.ratingLabel}
                  hotelName={accommodation.hotelName}
                  checkIn={accommodation.checkIn}
                  checkOut={accommodation.checkOut}
                  nights={accommodation.nights}
                  statusText={accommodation.statusText}
                />
              ))}
            </div>

            {/* Left Arrow Button - Visible if scrolled at least a little */}
            {isHovered && hasScrolled && (
              <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[42px] h-[42px] bg-[#333333] rounded-full flex items-center justify-center z-10 cursor-pointer max-md:hidden"
                onClick={scrollLeft}
              >
                <FaArrowLeft className="text-[16px] text-[#D3F462]" />
              </div>
            )}

            {/* Right Arrow Button - Always visible when hovered */}
            {isHovered && (
              <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[42px] h-[42px] bg-[#333333] rounded-full flex items-center justify-center z-10 cursor-pointer max-md:hidden"
                onClick={scrollRight}
              >
                <FaArrowRight className="text-[16px] text-[#D3F462]" />
              </div>
            )}
          </div>
        </div>

        {/* Activities Section */}
        <div className=" mt-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[18px] font-[700] text-gray-900 dark:text-white">
              Activities
            </h3>
            <span className="text-[12px] font-[800] text-[#3643FB] dark:text-[#D1F462] underline underline-offset-2">
              See all
            </span>
          </div>

          <div className="w-full h-[120px] rounded-2xl  dark:bg-[#333333] border-[1px] border-[#BFBFBF] dark:border-none flex flex-col justify-between p-4">
            <div className="flex gap-2.5">
              <div className="dark:bg-[#D3F462] w-[85px] h-[30px] bg-[#313DDF] rounded-[8px] dark:text-[#333333] text-white text-[12px] font-[600] flex justify-center items-center ">
                Day plan
              </div>
              <div className="dark:bg-[#333333] w-[85px] h-[30px] bg-white rounded-[8px] dark:text-[#D3F462] text-[#313DDF] text-[12px] font-[600] flex justify-center items-center border-[1px] border-[#313DDF] dark:border-[#D3F462] ">
                {tripData?.activities.totalCount} Activities
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto custom-scrollbar">
              {tripData?.activities?.days?.map((day, index) => (
                <DaysUi
                  key={index} // Unique key for each day
                  firstDay={day.isFirstDay}
                  date={day.date}
                  day={day.day}
                  month={day.month}
                />
              ))}
            </div>
          </div>

          <div className="my-4 flex gap-6 items-center">
            <div className="flex gap-2 p-1 bg-[#313DDF] dark:bg-[#D3F462] rounded-[8px] text-white dark:text-black text-[12px] font-[600]">
              <div>Day 1</div>
              <div>01.01.2025</div>
            </div>
            <div className=" text-[#313DDF] dark:text-[#D3F462] rounded-[8px]  text-[12px] font-[600]">
              3 Activities
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ActivityCard
              image="https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg"
              title="Senso-ji Temple & Nakamise Shopping Street"
              timing="8:00 AM"
              duration="2 hours"
              pickUp="From Hotel"
            />

            <ActivityCard
              image="https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg"
              title="Tokyo Tower Visit"
              timing="9:00 AM"
              duration="3 hours"
              pickUp="From Station"
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <Exports.components.BottomNavigation />
      </div>
    </section>
  );
};

export default Home;
