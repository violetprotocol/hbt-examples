const port = 5000;
const baseURL = "http://localhost:" + port;

export const BACKEND_ENDPOINTS = {
  eligible: (address: string) => baseURL + "/eligible/" + address,
  siweNonce: baseURL + "/siwe/nonce",
  siweVerify: baseURL + "/siwe/verify",
  register: baseURL + "/registration",
  isRegistered: (address: string) => baseURL + "/registration/" + address,
  merkleDetails: baseURL + "/registration/merkle-details",
};
