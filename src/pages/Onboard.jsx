import React, { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser, FaUserFriends, FaUsers, FaHeart } from "react-icons/fa";

// Input Field Component
const InputField = ({ icon, placeholder, value, onChange, id, name }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300">
        {icon}
      </div>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full px-10 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-[#333333] text-gray-800 dark:text-gray-100 
                  placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

// Select Dropdown Component
const SelectField = ({ icon, options, value, onChange, id, name }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300">
        {icon}
      </div>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="appearance-none block w-full px-10 py-3 rounded-lg border border-gray-200 
                  dark:border-gray-700 bg-white dark:bg-[#333333] text-gray-800 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select Duration
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 pointer-events-none" />
    </div>
  );
};

// Travel Type Option Component
const TravelTypeOption = ({ id, label, icon, selected, onChange }) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border cursor-pointer transition-all
        ${
          selected
            ? "bg-[#3643FB] text-white border-blue-500"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#333333] hover:border-gray-400 dark:hover:border-gray-500"
        }`}
    >
      <input
        type="radio"
        id={id}
        name="travelType"
        value={id}
        onChange={onChange}
        checked={selected}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="flex items-center gap-3 p-3 cursor-pointer w-full"
      >
        <div className={`text-xl ${selected ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>
          {icon}
        </div>
        <span className={`text-base font-medium ${selected ? "text-white" : "text-gray-800 dark:text-gray-100"}`}>
          {label}
        </span>
      </label>
    </div>
  );
};

// Section Title Component
const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{title}</h1>
      {subtitle && <p className="text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>}
    </div>
  );
};

// Form Section Component
const FormSection = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <label className="text-lg font-bold text-gray-900 dark:text-gray-50">{title}</label>
      {children}
    </div>
  );
};

// Main Onboarding Component
const Onboard = () => {
  // Form state
  const [formState, setFormState] = useState({
    destination: "",
    duration: "",
    travelType: "",
    currentStep: 1,
    totalSteps: 2
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleContinue = (e) => {
    e.preventDefault();
    if (formState.currentStep < formState.totalSteps) {
      setFormState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      // Submit the form data or navigate to another page
      console.log("Form submitted:", formState);
      // You can add navigation logic here
    }
  };

  // Duration options
  const durationOptions = Array.from({ length: 14 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} ${i + 1 === 1 ? "day" : "days"}`
  }));

  // Travel type options
  const travelTypeOptions = [
    { id: "solo", label: "Solo", icon: <FaUser /> },
    { id: "couple", label: "Couple", icon: <FaHeart /> },
    { id: "family", label: "Family", icon: <FaUsers /> },
    { id: "friends", label: "Friends", icon: <FaUserFriends /> }
  ];

  // Render the first step (travel preferences)
  const renderStep1 = () => (
    <div className="flex flex-col gap-8 w-full">
      <SectionTitle 
        title="Plan Your Journey, Your Way!" 
        subtitle="Let's create your personalised travel experience" 
      />

      <FormSection title="Where would you like to go?">
        <InputField
          icon={<GrLocation />}
          placeholder="Enter Destination"
          value={formState.destination}
          onChange={handleInputChange}
          id="destination"
          name="destination"
        />
      </FormSection>

      <FormSection title="How long will you stay?">
        <SelectField
          icon={<FaRegCalendarAlt />}
          options={durationOptions}
          value={formState.duration}
          onChange={handleInputChange}
          id="duration"
          name="duration"
        />
      </FormSection>

      <FormSection title="Who are you traveling with?">
        <div className="grid grid-cols-2 gap-4">
          {travelTypeOptions.map((option) => (
            <TravelTypeOption
              key={option.id}
              id={option.id}
              label={option.label}
              icon={option.icon}
              selected={formState.travelType === option.id}
              onChange={handleInputChange}
            />
          ))}
        </div>
      </FormSection>
    </div>
  );

  // Render the second step (could be preferences, budget, etc.)
  const renderStep2 = () => (
    <div className="flex flex-col gap-8 w-full">
      <SectionTitle 
        title="Almost there!" 
        subtitle="Let's customize your travel experience further" 
      />
      
      {/* You can add more form sections here */}
      <div className="text-center text-lg text-gray-800 dark:text-gray-200">
        Step 2 content will go here
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 dark:bg-[#0B0809] min-h-screen w-full">
      <main className="flex flex-col max-w-md mx-auto justify-between min-h-screen px-4 py-8">
        <form onSubmit={handleContinue} className="flex flex-col gap-8 flex-grow">
          {formState.currentStep === 1 ? renderStep1() : renderStep2()}
          
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