import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});


export const sendInfoDocument = async (body: any) => {
  return await api.post("/", body);
};
