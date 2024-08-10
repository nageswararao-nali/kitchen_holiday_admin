import apiRequest from '../utils/api';
import { LOGIN } from '../utils/apiRoutes'

const register = async (userData) => {
  return await apiRequest('register', 'POST', userData);
};

const login = async (userData) => {
  return await apiRequest(LOGIN, 'POST', userData);
};

const getUserData = async (token) => {
  return await apiRequest('user', 'GET', null, token);
};

const authService = {
  register,
  login,
  getUserData,
};

export default authService;
