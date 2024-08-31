
import apiRequest from '../utils/api';
import { ADD_SUBSCRIPTION, GET_SUBSCRIPTIONS, ADD_ZONE, GET_ZONES, MAP_ZONE_USER, 
  GET_MAP_ZONE_USER, GET_DELIVERY_ORDER_DATES, DELETE_SUBSCRIPTION} from '../utils/apiRoutes'

// const userToken = localStorage.getItem('userToken');

const addSubscription = async (reqObj, userToken) => {
    return await apiRequest(ADD_SUBSCRIPTION, 'POST', reqObj, userToken);
  };

const getSubscriptions = async (reqObj, userToken) => {
    return await apiRequest(GET_SUBSCRIPTIONS, 'POST', reqObj, userToken);
};

const addZone = async (reqObj, userToken) => {
    return await apiRequest(ADD_ZONE, 'POST', reqObj, userToken);
  };

const getZones = async (reqObj, userToken) => {
    return await apiRequest(GET_ZONES, 'POST', reqObj, userToken);
};

const addZoneMapping = async (reqObj, userToken) => {
  return await apiRequest(MAP_ZONE_USER, 'POST', reqObj, userToken);
};

const zoneMappingsData = async (reqObj, userToken) => {
  return await apiRequest(GET_MAP_ZONE_USER, 'POST', reqObj, userToken);
};

const getOrderDates = async (reqObj, userToken) => {
  return await apiRequest(GET_DELIVERY_ORDER_DATES, 'POST', reqObj, userToken);
};

const deleteSubscription = async (reqObj, userToken) => {
  return await apiRequest(DELETE_SUBSCRIPTION, 'POST', reqObj, userToken);
};

const usersService = {
    addSubscription,
    getSubscriptions,
    addZone,
    getZones,
    addZoneMapping,
    zoneMappingsData,
    getOrderDates,
    deleteSubscription
};

export default usersService;
