import React, { useState, useEffect } from "react";
import { GrLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser, FaUserFriends, FaUsers, FaHeart } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Onboard = () => {
  // Form state
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    travelType: ""
  });

  // Form validation errors
  const [errors, setErrors] = useState({});
  
  // Toast visibility state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // "success" or "error"

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is filled
    if (value) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.destination.trim()) {
      newErrors.destination = "Please enter a destination";
    }
    
    if (!formData.duration) {
      newErrors.duration = "Please select a duration";
    }
    
    if (!formData.travelType) {
      newErrors.travelType = "Please select who you're traveling with";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid
      setToastMessage("Great! Planning your trip...");
      setToastType("success");
      setShowToast(true);
      console.log("Form submitted:", formData);
      // Navigate or proceed to next step
      // Example: navigate("/next-step", { state: formData });
    } else {
      // Form has errors
      setToastMessage("Please fill in all the required fields");
      setToastType("error");
      setShowToast(true);
    }
  };

  // Custom toast component
  const CustomToast = ({ message, type, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }, [onClose]);
    
    return (
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg 
        ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white flex items-center justify-between min-w-[300px]`}>
        <span>{message}</span>
        <button 
          onClick={onClose}
          className="ml-4 text-white font-bold"
        >
          ×
        </button>
      </div>
    );
  };

  // Travel type options
  const travelTypeOptions = [
    { id: "solo", label: "Solo", icon: <FaUser /> },
    { id: "couple", label: "Couple", icon: <FaHeart /> },
    { id: "family", label: "Family", icon: <FaUsers /> },
    { id: "friends", label: "Friends", icon: <FaUserFriends /> }
  ];

  return (
    <section className="bg-[#FDFBF7] dark:bg-[#0B0809] min-h-screen w-full">
      {showToast && (
        <CustomToast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)} 
        />
      )}
      
      <main className="flex flex-col max-w-md mx-auto justify-between min-h-screen px-4 py-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 flex-grow">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              Plan Your Journey, Your Way!
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Let's create your personalised travel experience
            </p>
          </div>

          {/* Destination Input */}
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-lg font-bold text-gray-900 dark:text-gray-50">
              Where would you like to go?
            </label>
            <div className="relative w-full">
              <GrLocation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300" />
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className={`block w-full px-10 py-3 rounded-lg border 
                  ${errors.destination ? "border-red-500" : "border-gray-200 dark:border-gray-700"} 
                  bg-white dark:bg-[#333333] text-gray-800 dark:text-gray-100 dark:placeholder-[#f5f5f5]` }
                placeholder="Enter Destination"
              />
            </div>
            {errors.destination && (
              <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
            )}
          </div>

          {/* Duration Dropdown */}
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-lg font-bold text-gray-900 dark:text-gray-50">
              How long will you stay?
            </label>
            <div className="relative w-full">
              <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300" />
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={`appearance-none block w-full px-10 py-3 rounded-lg border 
                  ${errors.duration ? "border-red-500" : "border-gray-200 dark:border-gray-700"} 
                  bg-white dark:bg-[#333333] text-gray-800 dark:text-gray-100`}
              >
                <option value="" disabled>
                  Select Duration
                </option>
                {Array.from({ length: 14 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "day" : "days"}
                  </option>
                ))}
              </select>
              <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 pointer-events-none" />
            </div>
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>

          {/* Travel Type Options */}
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-lg font-bold text-gray-900 dark:text-gray-50">
              Who are you traveling with?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {travelTypeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center gap-2 rounded-lg border cursor-pointer transition-all
                    ${
                      formData.travelType === option.id
                        ? "bg-[#3643FB] text-white border-blue-500"
                        : errors.travelType 
                          ? "border-red-500 bg-white dark:bg-[#333333]"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#333333]"
                    }`}
                >
                  <input
                    type="radio"
                    id={option.id}
                    name="travelType"
                    value={option.id}
                    onChange={handleInputChange}
                    checked={formData.travelType === option.id}
                    className="hidden"
                  />
                  <label
                    htmlFor={option.id}
                    className="flex items-center gap-3 p-3 cursor-pointer w-full h-full"
                  >
                    <div className={formData.travelType === option.id ? "text-white" : "text-gray-600 dark:text-gray-300"}>
                      {option.icon}
                    </div>
                    <span className={`font-medium ${formData.travelType === option.id ? "text-white" : "text-gray-800 dark:text-gray-100"}`}>
                      {option.label}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            {errors.travelType && (
              <p className="text-red-500 text-sm mt-1">{errors.travelType}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-auto pt-6">
            <button 
              type="submit"
              className="w-full bg-[#3643FB] text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Onboard;