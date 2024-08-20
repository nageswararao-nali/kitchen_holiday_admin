import apiRequest from '../utils/api';
import { TOTAL_USERS, ADD_USER, GET_USERS } from '../utils/apiRoutes'

// const userToken = localStorage.getItem('userToken');

const getTotalUsers = async (reqObj, userToken) => {
  return await apiRequest(TOTAL_USERS, 'POST', reqObj, userToken);
};

const addUser = async (user, userToken) => {
    return await apiRequest(ADD_USER, 'POST', user, userToken);
};

const getUsers = async (reqObj, userToken) => {
    return await apiRequest(GET_USERS, 'POST', reqObj, userToken);
  };

const usersService = {
    getTotalUsers,
    addUser,
    getUsers
};

export default usersService;
