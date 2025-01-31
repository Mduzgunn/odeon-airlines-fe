import axios from "axios";

const BASE_URL = "http://localhost:8080/api/flights";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const searchFlights = async (departureCity, arrivalCity, date) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: getHeaders(),
      params: {
        departureCity,
        arrivalCity,
        date,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error searching flights:", error);
    throw error;
  }
};

export const getFlightsByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/city/${city}`, {
      headers: getHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching flights by city:", error);
    throw error;
  }
};

export const getAllFlights = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`, {
      headers: getHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all flights:", error);
    throw error;
  }
};

export const createFlight = async (flightData) => {
  try {
    const response = await axios.post(BASE_URL, flightData, {
      headers: getHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating flight:", error);
    throw error;
  }
};
