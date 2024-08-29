import axios from 'axios';

// const API_URL = 'http://localhost:3001/api/';
const API_URL = 'http://3.142.140.177:3000/api/';

const getHeaders = (token, isFile) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if(isFile) {
    headers['content-type'] = 'multipart/form-data';
  }
  return headers;
};

const apiRequest = async (endpoint, method, data, token = null, isFile = false) => {
  try {
    const response = await axios({
      url: `${API_URL}${endpoint}`,
      method,
      data,
      headers: getHeaders(token, isFile),
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
};

export default apiRequest;
