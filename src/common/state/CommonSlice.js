import { createSlice } from "@reduxjs/toolkit";
import { getAllCountiesAction, getAllUsersAction, getSkillsGroupedByCategoryAction, getSuggestedMatchesAction, searchUsersBySkillAndCountyAction, updateProfileAction, getRecentSearchedSkillsAction, getChatHistoryAction } from "./CommonActions";

const initialState = {
  getAllUsers: false,
  getAllUsersResp: null,

  getAllCounties: false,
  getAllCountiesResp: null,

  updateProfile: false,
  updateProfileResp: null,

  getSkillsGroupedByCategory: false,
  getSkillsGroupedByCategoryResp: null,

  searchUsersBySkillAndCounty: false,
  searchUsersBySkillAndCountyResp: null,

  getSuggestedMatches: false,
  getSuggestedMatchesResp: null,

  getRecentSearchedSkills: false,
  getRecentSearchedSkillsResp: null,

  getChatHistory: false,
  getChatHistoryResp: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    // Handle async actions here if needed
    builder
      .addCase(getAllUsersAction.pending, (state) => {
        state.getAllUsers = true;
        state.getAllUsersResp = null;
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        state.getAllUsers = false;
        state.getAllUsersResp = action.payload;
      })
      .addCase(getAllUsersAction.rejected, (state, action) => {
        state.getAllUsers = false;
        state.getAllUsersResp = action.payload;
      })

      .addCase(getAllCountiesAction.pending, (state) => {
        state.getAllCounties = true;
        state.getAllCountiesResp = null;
      })
      .addCase(getAllCountiesAction.fulfilled, (state, action) => {
        state.getAllCounties = false;
        state.getAllCountiesResp = action.payload;
      })
      .addCase(getAllCountiesAction.rejected, (state, action) => {
        state.getAllCounties = false;
        state.getAllCountiesResp = action.payload;
      })

      .addCase(updateProfileAction.pending, (state) => {
        state.updateProfile = true;
        state.updateProfileResp = null;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.updateProfile = false;
        state.updateProfileResp = action.payload;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.updateProfile = false;
        state.updateProfileResp = action.payload;
      })

      .addCase(getSkillsGroupedByCategoryAction.pending, (state) => {
        state.getSkillsGroupedByCategory = true;
        state.getSkillsGroupedByCategoryResp = null;
      })
      .addCase(getSkillsGroupedByCategoryAction.fulfilled, (state, action) => {
        state.getSkillsGroupedByCategory = false;
        state.getSkillsGroupedByCategoryResp = action.payload;
      })
      .addCase(getSkillsGroupedByCategoryAction.rejected, (state, action) => {
        state.getSkillsGroupedByCategory = false;
        state.getSkillsGroupedByCategoryResp = action.payload;
      })

      .addCase(searchUsersBySkillAndCountyAction.pending, (state) => {
        state.searchUsersBySkillAndCounty = true;
        state.searchUsersBySkillAndCountyResp = null;
      })
      .addCase(searchUsersBySkillAndCountyAction.fulfilled, (state, action) => {
        state.searchUsersBySkillAndCounty = false;
        state.searchUsersBySkillAndCountyResp = action.payload;
      })
      .addCase(searchUsersBySkillAndCountyAction.rejected, (state, action) => {
        state.searchUsersBySkillAndCounty = false;
        state.searchUsersBySkillAndCountyResp = action.payload;
      })

      .addCase(getSuggestedMatchesAction.pending, (state) => {
        state.getSuggestedMatches = true;
        state.getSuggestedMatchesResp = null;
      })
      .addCase(getSuggestedMatchesAction.fulfilled, (state, action) => {
        state.getSuggestedMatches = false;
        state.getSuggestedMatchesResp = action.payload;
      })
      .addCase(getSuggestedMatchesAction.rejected, (state, action) => {
        state.getSuggestedMatches = false;
        state.getSuggestedMatchesResp = action.payload;
      })

      .addCase(getRecentSearchedSkillsAction.pending, (state) => {
        state.getRecentSearchedSkills = true;
        state.getRecentSearchedSkillsResp = null;
      })
      .addCase(getRecentSearchedSkillsAction.fulfilled, (state, action) => {
        state.getRecentSearchedSkills = false;
        state.getRecentSearchedSkillsResp = action.payload;
      })
      .addCase(getRecentSearchedSkillsAction.rejected, (state, action) => {
        state.getRecentSearchedSkills = false;
        state.getRecentSearchedSkillsResp = action.payload;
      })

      .addCase(getChatHistoryAction.pending, (state) => {
        state.getChatHistory = true;
        state.getChatHistoryResp = null;
      })
      .addCase(getChatHistoryAction.fulfilled, (state, action) => {
        state.getChatHistory = false;
        state.getChatHistoryResp = action.payload;
      })
      .addCase(getChatHistoryAction.rejected, (state, action) => {
        state.getChatHistory = false;
        state.getChatHistoryResp = action.payload;
      });
  },
});


export default commonSlice.reducer;
