import axios from "axios";

export const API_BASE_URL = "http://localhost:5276";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async () => {
  const response = await api.get("/api/Products");
  return response.data;
};

export const getProductsByCollectionId = async (collectionId) => {
  const response = await api.get(`/api/Products/collection/${collectionId}`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/api/Products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await api.get(`/api/Products/category/${category}`);
  return response.data;
}
  