import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers,
  deleteUser,
  addUser,
  updateUser,
} from "../../services/adminService";

//fetchusers

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (token, thunkApi) => {
    try {
      return await getUsers(token);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

//remove user

export const removeUser = createAsyncThunk(
  "admin/delete",
  async ({ id, token }, thunkApi) => {
    try {
      await deleteUser(id, token);

      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Delete Filed",
      );
    }
  },
);

//createuser

export const createUser = createAsyncThunk(
  "admin/createUser",
  async ({ userData, token }, thunkApi) => {
    try {
      return await addUser(userData, token);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add user",
      );
    }
  },
);

//edituser

export const editUser = createAsyncThunk(
  "admin/editUser",
  async ({ id, userData, token }, thunkApi) => {
    try {
      return await updateUser(id, userData, token);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update user",
      );
    }
  },
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

//slice

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},

  extraReducers: (bulder) => {
    bulder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload,
        );
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload.user);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) => {
          return user._id === action.payload.user._id
            ? action.payload.user
            : user;
        });
      });
  },
});

export default adminSlice.reducer;
