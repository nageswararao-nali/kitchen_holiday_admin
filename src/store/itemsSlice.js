import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemService from '../services/itemService';
import { handleAuthApiCall } from '../utils/apiUtils';

export const getCategories = createAsyncThunk('categories/getCategories', async (thunkAPI) => {
  return handleAuthApiCall(itemService.getCategories, {}, thunkAPI);
});

export const addItem = createAsyncThunk('item/addItem', async (item, thunkAPI) => {
  return handleAuthApiCall(itemService.addItem, item, thunkAPI);
});

export const getItems = createAsyncThunk('items/getItems', async (thunkAPI) => {
  return handleAuthApiCall(itemService.getItems, {}, thunkAPI);
});

export const getItem = createAsyncThunk('items/getItem', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(itemService.getItem, reqObj, thunkAPI);
});

export const addSubItem = createAsyncThunk('item/addSubItem', async (item, thunkAPI) => {
  return handleAuthApiCall(itemService.addSubItem, item, thunkAPI);
});

export const getSubItems = createAsyncThunk('items/getSubItems', async (thunkAPI) => {
  return handleAuthApiCall(itemService.getSubItems, {}, thunkAPI);
});

export const getSubItem = createAsyncThunk('items/getSubItem', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(itemService.getSubItem, reqObj, thunkAPI);
});

export const addItemMapping = createAsyncThunk('item/addItemMapping', async (item, thunkAPI) => {
  return handleAuthApiCall(itemService.addItemMapping, item, thunkAPI);
});

export const itemMappingsData = createAsyncThunk('items/itemMappingsData', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(itemService.itemMappingsData, reqObj, thunkAPI);
});


const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    loading: false,
    categories: [],
    items: [],
    subItems: [],
    mappings: [],
    item: null,
    subItem: null,
    error: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.categories = action.payload.data.categories
        }
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        if(!action.payload.success) {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.items = action.payload.data.items
        } else {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.item = action.payload.data
        } else {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addSubItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSubItem.fulfilled, (state, action) => {
        if(!action.payload.success) {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(addSubItem.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSubItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubItems.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.subItems = action.payload.data.items
        } else {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(getSubItems.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSubItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubItem.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.subItem = action.payload.data
        } else {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(getSubItem.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addItemMapping.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemMapping.fulfilled, (state, action) => {
        if(!action.payload.success) {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(addItemMapping.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(itemMappingsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(itemMappingsData.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.mappings = action.payload.data.items
        } else {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(itemMappingsData.rejected, (state, action) => {
        state.loading = false;
      })
      
  },
});

export const {  } = itemsSlice.actions;

export default itemsSlice.reducer;
