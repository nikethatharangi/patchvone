import axios from "axios";

//export const API_BASE_URL = "http://localhost:5276";
export const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const api = axios.create({
  baseURL: BASE_URL,
});

export const getSizesByProductCode = async (productCode) => {
  const response = await api.get(`/api/Sizes/product/${productCode}`);
  return response.data;
}