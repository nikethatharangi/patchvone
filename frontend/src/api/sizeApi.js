import axios from "axios";

export const API_BASE_URL = "http://localhost:5276";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getSizesByProductCode = async (productCode) => {
  const response = await api.get(`/api/Sizes/product/${productCode}`);
  return response.data;
}