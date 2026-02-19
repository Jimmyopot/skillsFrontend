import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../utils/config";

export const submitRatingAction = createAsyncThunk(
	"dashboard/submitRating",
	async (payload, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem("authToken");

			if (!token) {
				return rejectWithValue("Authentication token not found. Please login.");
			}

			console.log("submitRatingAction - Sending payload:", payload);

			const response = await axios.post(
				`${config.apiUrl}ratings/submit-rating`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			console.log("submitRatingAction - Response:", response.data);
			return response.data;
		} catch (error) {
			console.error("submitRatingAction - Error:", error.response?.data || error.message);
			return rejectWithValue(
				error.response?.data || "Failed to submit rating"
			);
		}
	}
);

export const getRatingStatsAction = createAsyncThunk(
	"dashboard/getRatingStats",
	async (userId, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem("authToken");

			if (!token) {
				return rejectWithValue("Authentication token not found. Please login.");
			}

			const response = await axios.get(
				`${config.apiUrl}ratings/stats/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Failed to fetch rating statistics"
			);
		}
	}
);
