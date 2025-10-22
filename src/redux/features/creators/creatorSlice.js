import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import creatorService from "./creatorService";

export const getAllCreators = createAsyncThunk(
  "creators/getAll",
  async (_, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      return await creatorService.getAllCreators(token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch creators";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const creatorSlice = createSlice({
  name: "creators",
  initialState: {
    creators: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCreators.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCreators.fulfilled, (state, action) => {
        state.isLoading = false;
        state.creators = action.payload;
      })
      .addCase(getAllCreators.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default creatorSlice.reducer;
