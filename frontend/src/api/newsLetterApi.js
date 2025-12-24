import axios from "axios";

const API_BASE_URL = "http://localhost:5276";

export const subscribeNewsletter = async (email) => {
  return axios.post(`${API_BASE_URL}/api/NewsLetters`, {
    newsLetterEmail: email,
  });
};