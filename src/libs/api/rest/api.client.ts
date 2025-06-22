import axios from "axios";
import { env } from "@/config/env";

export const httpClient = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export const api = {
  driver: {
    get: async (id: string) => {
      return await httpClient.get(`/drivers/${id}`);
    },
  },
};
