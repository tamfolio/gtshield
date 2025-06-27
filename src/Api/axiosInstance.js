import axios from "axios";


const BASE_URL = "https://api.thegatewayshield.com/api/v1";

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});




export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

