import { GoogleGenerativeAI } from "@google/generative-ai";

const generateTripPlan = async (userPrompt, onSuccess, onError) => {
  if (!userPrompt) {
    onError("Missing user prompt");
    return;
  }



  // Schema for the response data - no image URLs
  const responseSchema = {
    type: "object",
    properties: {
      tripInfo: {
        type: "object",
        properties: {
          city: { type: "string" },
          country: { type: "string" },
          flightInfo: {
            type: "object",
            properties: {
              departureDate: { type: "string" },
              departureTime: { type: "string" },
              departureAirport: { type: "string" },
              departureCity: { type: "string" },
              departureCountry: { type: "string" },
              arrivalAirport: { type: "string" },
              arrivalCity: { type: "string" },
              arrivalCountry: { type: "string" }
            },
            required: ["departureDate", "departureTime", "departureAirport", "departureCity", "departureCountry", "arrivalAirport", "arrivalCity", "arrivalCountry"]
          },
          duration: { type: "string" },
          size: { type: "string" },
          activitiesCount: { type: "number" },
          tripDates: {
            type: "object",
            properties: {
              start: { type: "string" },
              end: { type: "string" }
            },
            required: ["start", "end"]
          }
        },
        required: ["city", "country", "flightInfo", "duration", "size", "activitiesCount", "tripDates"]
      },
      accommodations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            hotelName: { type: "string" },
            ratingLabel: { type: "string" },
            checkIn: { type: "string" },
            checkOut: { type: "string" },
            nights: { type: "number" },
            statusText: { type: "string" },
            hotelType: { type: "string" } // For image search purposes
          },
          required: ["hotelName", "ratingLabel", "checkIn", "checkOut", "nights", "statusText", "hotelType"]
        },
        minItems: 1
      },
      activities: {
        type: "object",
        properties: {
          totalCount: { type: "number" },
          days: {
            type: "array",
            items: {
              type: "object",
              properties: {
                date: { type: "string" },
                day: { type: "string" },
                month: { type: "string" },
                isFirstDay: { type: "boolean" },
                activities: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" }, // For image search
                      timing: { type: "string" },
                      duration: { type: "string" },
                      pickUp: { type: "string" },
                      activityType: { type: "string" } // For image search
                    },
                    required: ["title", "description", "timing", "duration", "pickUp", "activityType"]
                  }
                }
              },
              required: ["date", "day", "month", "isFirstDay", "activities"]
            }
          }
        },
        required: ["totalCount", "days"]
      },
      cityDescriptors: {
        type: "array",
        items: { type: "string" }, // Keywords for image search
        minItems: 3,
        maxItems: 10
      }
    },
    required: ["tripInfo", "accommodations", "activities", "cityDescriptors"]
  };

  try {
    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Parse the following user input and generate a detailed trip plan: "${userPrompt.destination} for ${userPrompt.duration} days with ${userPrompt.travelType}".
      
      Create a comprehensive trip plan with the following structure:
      
      1. Trip Information:
         - City and country name
         - Flight details including departure date, time, airport codes, and city names
         - Trip duration in days
         - Group size (e.g., "4 (2M,2F)" for 2 males and 2 females)
         - Number of activities planned
         - Trip start and end dates (formatted as DD.MM.YYYY)
      
      2. Accommodations:
         - Generate 3 realistic accommodations with:
           * Hotel name (realistic and specific to the location)
           * Rating label (e.g., "Very good", "Excellent")
           * Check-in and check-out dates and times (formatted as DD.MM.YYYY, HH:MM am/pm)
           * Number of nights
           * Status text (e.g., "Confirmed")
           * Hotel type (e.g., "Luxury Hotel", "Boutique Hotel", "Resort") for image search purposes
      
      3. Activities:
         - Total number of activities
         - Day-by-day breakdown:
           * Date (DD format)
           * Day (three-letter format: Sun, Mon, etc.)
           * Month (three-letter format: JAN, FEB, etc.)
           * Flag for first day
           * 2-3 detailed activities per day with:
             - Activity title (specific to the destination)
             - Short description (2-3 sentences) for image search purposes
             - Timing (e.g., "8:00 AM")
             - Duration (e.g., "2 hours")
             - Pick-up information (e.g., "From Hotel")
             - Activity type (e.g., "Temple Visit", "Shopping", "Museum", "Beach") for image search purposes
      
      4. City Descriptors:
         - List of 3-10 keywords or short phrases that best describe this city (for image search purposes)
         - Include landmarks, architectural styles, natural features, etc.
      
      Base all trip details on the city mentioned in the user prompt or suggest a popular tourist destination if no city is mentioned.
      Make sure dates are realistic and sequential starting from current date ${new Date().toISOString().split("T")[0]}.
      For flights, use realistic airport codes.
      Ensure all times and schedules make logical sense for the destination.
      Output as JSON following the provided schema.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const responseText = await result.response.text();
    const parsedOutput = JSON.parse(responseText);

    // Call the success callback with the parsed data
    onSuccess(parsedOutput);
    
  } catch (err) {
    // Log the full error message for better debugging
    console.error("Error during trip plan generation:", err);
    // Call the error callback with the error message
    onError("Failed to generate trip plan: " + err.message);
  }
};



export { generateTripPlan };
