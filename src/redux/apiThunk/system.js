import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPackage,
  getBanUserAdmin,
  getListUser,
  getPackage,
  getPostAdmin,
  getTotalInvoice,
  getTotalPost,
  getTotalUser,
  openBanUser,
  updateBanUser,
  updatePackage,
  updatePost,
  getTotalComment,
} from "../../api/admin";
export const getAllUser = createAsyncThunk(
  "system/getAllUser",
  async (thunkAPI) => {
    try {
      const response = await getListUser();
      console.log('response response', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllPostAdmin = createAsyncThunk(
  "system/getAllPostAdmin",
  async (thunkAPI) => {
    try {
      const response = await getPostAdmin();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateAllReport = createAsyncThunk(
  "order/updateAllReport",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updatePost(id, status);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllBanUserAdmin = createAsyncThunk(
  "system/getAllBanUserAdmin",
  async (thunkAPI) => {
    try {
      const response = await getBanUserAdmin();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateBanUserRport = createAsyncThunk(
  "order/updateBanUserRport",
  async ({ reportId, status }, thunkAPI) => {
    try {
      const response = await updateBanUser(reportId, status);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllTotalUser = createAsyncThunk(
  "system/getAllTotalUser",
  async (thunkAPI) => {
    try {
      const response = await getTotalUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllTotalPost = createAsyncThunk(
  "system/getAllTotalPost",
  async (thunkAPI) => {
    try {
      const response = await getTotalPost();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllTotalComment = createAsyncThunk(
  "system/getAllTotalComment",
  async (thunkAPI) => {
    try {
      const response = await getTotalComment();
      console.log({response})
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllTotalInvoice = createAsyncThunk(
  "system/getAllTotalInvoice",
  async (thunkAPI) => {
    try {
      const response = await getTotalInvoice();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const openBanUserRport = createAsyncThunk(
  "order/openBanUserRport",
  async ({ key }, thunkAPI) => {
    try {
      const response = await openBanUser(key);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllPackage = createAsyncThunk(
  "system/getAllPackage",
  async (thunkAPI) => {
    try {
      const response = await getPackage();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addAllPackage = createAsyncThunk(
  "post/addAllPackage",
  async ({data}, thunkAPI) => {
      try {
          const response = await addPackage(data);
          return response;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
      }
  }
);
export const updateAllPackage = createAsyncThunk(
  "post/updateAllPackage",
  async ({ key, data }, thunkAPI) => {
      try {
          const response = await updatePackage(key, data);
          return response;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
      }
  }
);