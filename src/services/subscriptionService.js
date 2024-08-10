
import apiRequest from '../utils/api';
import { ADD_SUBSCRIPTION, GET_SUBSCRIPTIONS, ADD_ZONE, GET_ZONES} from '../utils/apiRoutes'

const userToken = localStorage.getItem('userToken');

const addSubscription = async (reqObj) => {
    return await apiRequest(ADD_SUBSCRIPTION, 'POST', reqObj, userToken);
  };

const getSubscriptions = async (reqObj) => {
    return await apiRequest(GET_SUBSCRIPTIONS, 'POST', reqObj, userToken);
};

const addZone = async (reqObj) => {
    return await apiRequest(ADD_ZONE, 'POST', reqObj, userToken);
  };

const getZones = async (reqObj) => {
    return await apiRequest(GET_ZONES, 'POST', reqObj, userToken);
};

const usersService = {
    addSubscription,
    getSubscriptions,
    addZone,
    getZones
};

export default usersService;
