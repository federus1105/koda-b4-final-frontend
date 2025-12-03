import { apiClient } from "./apiClient";

export const createShortlink = async (url) => {
  return apiClient("/links", {
    method: "POST",
    body: JSON.stringify({ original_url: url }),
  });
};
