import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, null, {
      params: {
        username,
        password,
      },
    });

    if (response.data.result === "SUCCESS") {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
