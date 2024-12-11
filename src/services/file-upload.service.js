// External Libraries 
import axios from "axios";
// MUI Libraries
// Internal Libraries / Components
import { API_URL } from "../api/config";


const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
    return axios
      .post(`${API_URL}/image/upload`, file)
      .then((res) => res.data)              
      .catch(errorHandler);                  
  };

export default {
  uploadImage,
};