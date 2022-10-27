const port = 5000;
const baseURL = "http://localhost:" + port;

export const BACKEND_ENDPOINTS = {
  eligible: (address: string) => baseURL + "/eligible/" + address,
};
