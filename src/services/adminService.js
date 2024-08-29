
import apiRequest from '../utils/api';
import { GET_DELIVERY_SLOTS, GET_ZONES } from '../utils/apiRoutes'



const getDeliverySlots = async (reqObj, userToken) => {
    return await apiRequest(GET_DELIVERY_SLOTS, 'POST', reqObj, userToken);
};

const getZones = async (reqObj, userToken) => {
    return await apiRequest(GET_ZONES, 'POST', reqObj, userToken);
};


const adminService = {
    getDeliverySlots,
    getZones
};

export default adminService;
