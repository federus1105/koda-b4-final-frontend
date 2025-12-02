import {reduxStore} from "../redux/store"

export const apiClient = async (endpoint, options = {}) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  const state = reduxStore.getState();
  const token = state.auth.token;
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(response.status, data);
      throw { status: response.status, data };
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
