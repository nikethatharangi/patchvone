import axios from "axios";

const BASE_URL = "http://localhost:5276";

export const getBanners = async () => {
  const response = await axios.get(`${BASE_URL}/api/Banners`);
  return response.data;
};
