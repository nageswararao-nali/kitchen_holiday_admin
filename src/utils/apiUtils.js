export const handleAuthApiCall = async (apiCall, user, thunkAPI) => {
    try {
      const response = await apiCall(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  };
  