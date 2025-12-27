import axios from "axios";

//const API_BASE_URL = "http://localhost:5276";
const BASE_URL = process.env.REACT_APP_API_BASE_URLL;


export const subscribeNewsletter = async (email) => {
  return axios.post(`${BASE_URL}/api/NewsLetters`, {
    newsLetterEmail: email,
  });
};