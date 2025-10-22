import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/creators`;

// Get all creators
const getAllCreators = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // only if route is protected
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data.creators;
};

const creatorService = { getAllCreators };
export default creatorService;
