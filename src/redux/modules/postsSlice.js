import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis, apis_token } from "../../axios/api";

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getPosts = createAsyncThunk(
  "getPosts",
  async (payload, thunkAPI) => {
    try {
      const { data } = await apis.get("/api/board/list");
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
      console.log("payload", payload);
      const { data } = await apis_token.post("/api/board/", payload);
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
