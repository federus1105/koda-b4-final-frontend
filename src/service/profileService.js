import { apiClient } from "./apiClient";
// --- GET USER ---
export const profileUser = async () => {
    return apiClient("/profile", {
        method: "GET",
    })
}