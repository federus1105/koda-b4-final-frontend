import { apiClient } from "./apiClient";


// ===== REGISTER ======
export const registerUser = (formData) =>
  apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  // ====== LOGIN ========
export const loginUser = async (formData) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

// --- REFRESH TOKEN ---
export const refreshAccessToken = async (refreshToken) => {
  const res = await apiClient("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
  return res;
};

// --- LOGOUT ---
export const logoutUser = async (refreshToken) => {
  const res = await apiClient("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  return res;
};