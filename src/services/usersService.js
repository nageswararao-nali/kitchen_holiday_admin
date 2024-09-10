import apiRequest from '../utils/api';
import { TOTAL_USERS, ADD_USER, GET_USER, GET_USERS, DELETE_USER, UPDATE_USER, GET_USER_ADDRESSES, GET_USERS_SEARCH } from '../utils/apiRoutes'

// const userToken = localStorage.getItem('userToken');

const getTotalUsers = async (reqObj, userToken) => {
  return await apiRequest(TOTAL_USERS, 'POST', reqObj, userToken);
};

const updateUser = async (user, userToken) => {
    return await apiRequest(UPDATE_USER, 'POST', user, userToken);
};

const addUser = async (user, userToken) => {
  return await apiRequest(ADD_USER, 'POST', user, userToken);
};

const getUsers = async (reqObj, userToken) => {
    return await apiRequest(GET_USERS, 'POST', reqObj, userToken);
  };
const getUser = async (reqObj, userToken) => {
  return await apiRequest(GET_USER, 'POST', reqObj, userToken);
};

const deleteUser = async (user, userToken) => {
    return await apiRequest(DELETE_USER, 'POST', user, userToken);
};

const getUserAddresses = async (reqObj, userToken) => {
  return await apiRequest(GET_USER_ADDRESSES, 'POST', reqObj, userToken);
};

const getUsersSearch = async (reqObj, userToken) => {
  return await apiRequest(GET_USERS_SEARCH, 'POST', reqObj, userToken);
};

const usersService = {
    getTotalUsers,
    addUser,
    getUsers,
    deleteUser,
    getUserAddresses,
    getUsersSearch,
    getUser,
    updateUser
};

export default usersService;
