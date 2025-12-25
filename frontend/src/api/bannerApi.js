import axios from "axios";

//const BASE_URL = "http://localhost:5276";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const getBanners = async () => {
  const response = await axios.get(`${BASE_URL}/api/Banners`);
  return response.data;
};
