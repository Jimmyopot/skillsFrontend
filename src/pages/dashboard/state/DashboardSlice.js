import { createSlice } from "@reduxjs/toolkit";
import { submitRatingAction, getRatingStatsAction } from "./DashboardActions";

const initialState = {
	submitRating: false,
	submitRatingResp: null,
	submitRatingError: null,

	getRatingStats: false,
	getRatingStatsResp: null,
	getRatingStatsError: null,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		clearSubmitRatingState: (state) => {
			state.submitRating = false;
			state.submitRatingResp = null;
			state.submitRatingError = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(submitRatingAction.pending, (state) => {
				state.submitRating = true;
				state.submitRatingResp = null;
				state.submitRatingError = null;
			})
			.addCase(submitRatingAction.fulfilled, (state, action) => {
				state.submitRating = false;
				state.submitRatingResp = action.payload;
				state.submitRatingError = null;
			})
			.addCase(submitRatingAction.rejected, (state, action) => {
				state.submitRating = false;
				state.submitRatingResp = null;
				state.submitRatingError = action.payload;
			})

			.addCase(getRatingStatsAction.pending, (state) => {
				state.getRatingStats = true;
				state.getRatingStatsResp = null;
				state.getRatingStatsError = null;
			})
			.addCase(getRatingStatsAction.fulfilled, (state, action) => {
				state.getRatingStats = false;
				state.getRatingStatsResp = action.payload;
				state.getRatingStatsError = null;
			})
			.addCase(getRatingStatsAction.rejected, (state, action) => {
				state.getRatingStats = false;
				state.getRatingStatsResp = null;
				state.getRatingStatsError = action.payload;
			});
	},
});

export const { clearSubmitRatingState } = dashboardSlice.actions;

export default dashboardSlice.reducer;
