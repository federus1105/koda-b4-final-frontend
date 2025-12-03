import { apiClient } from "./apiClient";

export const getListLink = async ({ page = 1, search = "" } = {}) => {
  const query = new URLSearchParams({
    page: page.toString(),
    search,
  });

  return apiClient(`/links?${query.toString()}`, {
    method: "GET",
  });
};

export const deleteShortlink = async (shortcode) => {
  const res = await apiClient(`/links/${shortcode}`, {
    method: "DELETE",
  });
  return res;
};

