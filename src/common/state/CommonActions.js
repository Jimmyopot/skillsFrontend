import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../utils/config";

export const getAllUsersAction = createAsyncThunk(
  "common/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}users/GetAllUsers`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch users"
      );
    }
  }
);

export const getAllCountiesAction = createAsyncThunk(
  "common/getAllCounties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}utils/GetAllCounties`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch counties"
      );
    }
  }
);

export const updateProfileAction = createAsyncThunk(
  "common/updateProfile",
  async ({ userId, onSuccess, onFailure }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        config.apiUrl + `users/UpdateProfile/${userId}`
      );
      onSuccess(response.data);
      return response.data;
    } catch (error) {
      onFailure();
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSkillsGroupedByCategoryAction = createAsyncThunk(
  "common/getSkillsGroupedByCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}utils/GetSkillsGroupedByCategory`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch skills");
    }
  }
);

export const searchUsersBySkillAndCountyAction = createAsyncThunk(
  "common/searchUsersBySkillAndCounty",
  async ({ skill, county }, { rejectWithValue }) => {
    try {
      // Get token from localStorage for authentication
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return rejectWithValue("Authentication token not found. Please login.");
      }

      const response = await axios.get(
        `${config.apiUrl}Utils/SearchUsersBySkillAndCounty`,
        {
          params: { skill, county },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to search users");
    }
  }
);

export const getSuggestedMatchesAction = createAsyncThunk(
  "common/getSuggestedMatches",
  async ({ userId, limit, county }, { rejectWithValue }) => {
    try {
      // Get token from localStorage for authentication
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return rejectWithValue("Authentication token not found. Please login.");
      }

      const response = await axios.get(
        `${config.apiUrl}users/GetSuggestedMatches/${userId}`,
        {
          params: { limit, county },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch suggested matches"
      );
    }
  }
);

export const getRecentSearchedSkillsAction = createAsyncThunk(
  "common/getRecentSearchedSkills",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage for authentication
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return rejectWithValue("Authentication token not found. Please login.");
      }

      const response = await axios.get(
        `${config.apiUrl}Utils/GetRecentSearchedSkills`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch recent searched skills"
      );
    }
  }
);
