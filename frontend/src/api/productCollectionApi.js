import axios from "axios";

const BASE_URL = "http://localhost:5276";

export const getProductCollections = async () => {
  const response = await axios.get(`${BASE_URL}/api/ProductCollections`);
  return response.data;
};
