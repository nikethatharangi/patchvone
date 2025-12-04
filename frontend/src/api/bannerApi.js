import axios from "axios";

const API_URL = "http://localhost:5276/api/Banners";

export const getBanners = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
