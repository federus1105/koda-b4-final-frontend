import { toast } from "react-toastify";
import { Logout, setToken } from "../redux/slice/authSlice";
import {reduxStore} from "../redux/store"

// --- HELPER FUNC REFRESH TOKEN ---
export const refreshAccessToken = async (refreshToken) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const res = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) throw new Error("Refresh token invalid");

  const data = await res.json();
  return data.access_token; 
};

export const apiClient = async (endpoint, options = {}) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const state = reduxStore.getState();
  let token = state.auth.token;
  const refreshToken = state.auth.refreshToken;

  // --- HELPER REQUEST ---
  const fetchWithToken = async (accessToken) => {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(options.headers || {}),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw { status: res.status, data };
    }
    return data;
  };

  try {
    // --- REQUEST WITH TOKEN NOW ---
    return await fetchWithToken(token);
  } catch (error) {
    // --- 401 -> REFRESH TOKEN ---
    if (error.status === 401 && refreshToken) {
      try {
        const newToken = await refreshAccessToken(refreshToken);

        // --- SAVE NEW TOKEN ---
        reduxStore.dispatch(setToken(newToken));
        token = newToken;

        // --- RETRY REQUEST ---
        return await fetchWithToken(newToken);
      } catch (refreshError) {
        console.log(refreshError)
        // --- REFRESH TOKEN INVALID -> LOGOUT ---
        reduxStore.dispatch(Logout());
        toast.error("Session expired. Silahkan login ulang.");
        throw new Error("Session expired");
      }
    }

    throw error;
  }
};
