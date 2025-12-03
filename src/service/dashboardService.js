import { apiClient } from "./apiClient";

export const getDashboardStats = async () => {
  return apiClient("/dashboard/stats", {
    method: "GET",
  });
};