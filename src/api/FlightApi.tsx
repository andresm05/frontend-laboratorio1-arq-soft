import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_DB_URL || "http://localhost:8080/api/flights";

export const FlightApi = axios.create({
    baseURL: API_URL,
});