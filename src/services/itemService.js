
import apiRequest from '../utils/api';
import { GET_CATEGORIES, ADD_ITEM, GET_ITEMS, GET_ITEM, ADD_SUB_ITEM, GET_SUB_ITEMS, 
    GET_SUB_ITEM, ADD_ITEM_MAPPING, GET_ITEM_MAPPINGS, DELETE_ITEM, DELETE_SUB_ITEM} from '../utils/apiRoutes'

// const userToken = localStorage.getItem('userToken');

const getCategories = async (reqObj, userToken) => {
  return await apiRequest(GET_CATEGORIES, 'POST', reqObj, userToken);
};

const addItem = async (reqObj, userToken) => {
    return await apiRequest(ADD_ITEM, 'POST', reqObj, userToken, true);
  };

const getItems = async (reqObj, userToken) => {
    return await apiRequest(GET_ITEMS, 'POST', reqObj, userToken);
};

const getItem = async (reqObj, userToken) => {
    return await apiRequest(GET_ITEM, 'POST', reqObj, userToken);
};


const addSubItem = async (reqObj, userToken) => {
    return await apiRequest(ADD_SUB_ITEM, 'POST', reqObj, userToken, true);
  };

const getSubItems = async (reqObj, userToken) => {
    return await apiRequest(GET_SUB_ITEMS, 'POST', reqObj, userToken);
};

const getSubItem = async (reqObj, userToken) => {
    return await apiRequest(GET_SUB_ITEM, 'POST', reqObj, userToken);
};

const addItemMapping = async (reqObj, userToken) => {
    return await apiRequest(ADD_ITEM_MAPPING, 'POST', reqObj, userToken);
};

const itemMappingsData = async (reqObj, userToken) => {
    return await apiRequest(GET_ITEM_MAPPINGS, 'POST', reqObj, userToken);
};

const deleteItem = async (reqObj, userToken) => {
    return await apiRequest(DELETE_ITEM, 'POST', reqObj, userToken);
};

const deleteSubItem = async (reqObj, userToken) => {
    return await apiRequest(DELETE_SUB_ITEM, 'POST', reqObj, userToken);
};


const usersService = {
    getCategories,
    addItem,
    getItems,
    getItem,
    addSubItem,
    getSubItems,
    getSubItem,
    addItemMapping,
    itemMappingsData,
    deleteItem,
    deleteSubItem
};

export default usersService;
