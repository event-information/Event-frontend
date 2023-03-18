import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apis from "../../axios/api";

const initialState = {
  posts: [
    {
      id: 1,
      title: "",
      image: "",
      classify: "",
      region: "",
      location: "",
      startDate: "",
      endDate: "",
      contents: "",
    },
  ],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getPosts = createAsyncThunk(
  "getPosts",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:3001/todos1");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log("error-->", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postPosts = createAsyncThunk(
  "postPosts",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const { data } = await axios.post(
        "http://localhost:3001/todos1",
        payload
      );
      console.log("data-->123123123123123123", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log("error-->", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postslice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [__postPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      // state.posts = [...state, action.payload.data];
      console.log("action.payload", action.payload);
    },
    [__postPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__postPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = action.payload;
      console.log("action.payload", action.payload);
    },
    [__getPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default postslice.reducer;