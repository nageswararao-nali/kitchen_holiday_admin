
import apiRequest from '../utils/api';
import { ADD_ORDER, GET_ORDERS, GET_ORDER, UPDATE_ORDER} from '../utils/apiRoutes'

const userToken = localStorage.getItem('userToken');

const addOrder = async (reqObj) => {
    return await apiRequest(ADD_ORDER, 'POST', reqObj, userToken);
  };

const getOrders = async (reqObj) => {
    return await apiRequest(GET_ORDERS, 'POST', reqObj, userToken);
};

const getOrder = async (reqObj) => {
    return await apiRequest(GET_ORDER, 'POST', reqObj, userToken);
};

const updateOrderStatus = async (reqObj) => {
    return await apiRequest(UPDATE_ORDER, 'POST', reqObj, userToken);
  };


const usersService = {
    getOrder,
    getOrders,
    addOrder,
    updateOrderStatus
};

export default usersService;
