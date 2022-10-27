import { BACKEND_ENDPOINTS } from "src/config/endpoints";

export const getEligility = async (address: string) => {
  return fetch(BACKEND_ENDPOINTS.eligible(address), { mode: "cors" });
};
