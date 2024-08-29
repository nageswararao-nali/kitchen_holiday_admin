import apiRequest from '../utils/api';
import { TOTAL_USERS, ADD_USER, GET_USERS, DELETE_USER, GET_USER_ADDRESSES } from '../utils/apiRoutes'

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

const deleteUser = async (user, userToken) => {
    return await apiRequest(DELETE_USER, 'POST', user, userToken);
};

const getUserAddresses = async (reqObj, userToken) => {
  return await apiRequest(GET_USER_ADDRESSES, 'POST', reqObj, userToken);
};

const usersService = {
    getTotalUsers,
    addUser,
    getUsers,
    deleteUser,
    getUserAddresses
};

export default usersService;
