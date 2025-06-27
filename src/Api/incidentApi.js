import { publicRequest } from "./axiosInstance";

export const fetchIncidentTypes = async () => {
    const res = await publicRequest.get("/incident/types");
    return res.data; 
  };

  export const fetchStations = async () => {
    const res = await publicRequest.get("/feedback/stations");
    return res.data; 
  };