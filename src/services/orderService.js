
import apiRequest from '../utils/api';
import { ADD_ORDER, GET_ORDERS, GET_ORDER, UPDATE_ORDER, UPDATE_ORDER_STATUS, ADD_USER_ORDER} from '../utils/apiRoutes'

// const userToken = localStorage.getItem('userToken');

const addOrder = async (reqObj, userToken) => {
    return await apiRequest(ADD_ORDER, 'POST', reqObj, userToken);
  };

const getOrders = async (reqObj, userToken) => {
    return await apiRequest(GET_ORDERS, 'POST', reqObj, userToken);
};

const getOrder = async (reqObj, userToken) => {
    return await apiRequest(GET_ORDER, 'POST', reqObj, userToken);
};

const updateOrderStatus = async (reqObj, userToken) => {
    return await apiRequest(UPDATE_ORDER_STATUS, 'POST', reqObj, userToken);
  };
const updateOrder = async (reqObj, userToken) => {
  return await apiRequest(UPDATE_ORDER, 'POST', reqObj, userToken);
};

const addUserOrder = async (reqObj, userToken) => {
  return await apiRequest(ADD_USER_ORDER, 'POST', reqObj, userToken);
};

const usersService = {
    getOrder,
    getOrders,
    addOrder,
    updateOrderStatus,
    updateOrder,
    addUserOrder
};

export default usersService;
