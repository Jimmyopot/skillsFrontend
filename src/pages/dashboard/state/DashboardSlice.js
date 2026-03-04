import { createSlice } from "@reduxjs/toolkit";
import {
	submitRatingAction,
	getRatingStatsAction,
	getNotificationsAction,
	markNotificationAsReadAction,
} from "./DashboardActions";

const initialState = {
	submitRating: false,
	submitRatingResp: null,
	submitRatingError: null,

	getRatingStats: false,
	getRatingStatsResp: null,
	getRatingStatsError: null,

	getNotifications: false,
	getNotificationsResp: null,
	getNotificationsError: null,
	notifications: [],
	unreadCount: 0,

	markNotificationAsRead: false,
	markNotificationAsReadResp: null,
	markNotificationAsReadError: null,

	selectedChatFromNotification: null,
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
		clearNotificationsState: (state) => {
			state.getNotifications = false;
			state.getNotificationsResp = null;
			state.getNotificationsError = null;
		},
		updateNotificationLocally: (state, action) => {
			const { notificationId, isRead } = action.payload;
			const notification = state.notifications.find(
				(n) => n.notificationId === notificationId
			);
			if (notification) {
				notification.isRead = isRead;
				// Update unread count
				state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
			}
		},
		setSelectedChatFromNotification: (state, action) => {
			state.selectedChatFromNotification = action.payload;
		},
		clearSelectedChatFromNotification: (state) => {
			state.selectedChatFromNotification = null;
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
			})

			.addCase(getNotificationsAction.pending, (state) => {
				state.getNotifications = true;
				state.getNotificationsResp = null;
				state.getNotificationsError = null;
			})
			.addCase(getNotificationsAction.fulfilled, (state, action) => {
				state.getNotifications = false;
				state.getNotificationsResp = action.payload;
				state.getNotificationsError = null;
				// Store notifications from API response
				if (action.payload?.data) {
					state.notifications = action.payload.data;
					state.unreadCount = action.payload.data.filter((n) => !n.isRead).length;
				}
			})
			.addCase(getNotificationsAction.rejected, (state, action) => {
				state.getNotifications = false;
				state.getNotificationsResp = null;
				state.getNotificationsError = action.payload;
			})

			.addCase(markNotificationAsReadAction.pending, (state) => {
				state.markNotificationAsRead = true;
				state.markNotificationAsReadResp = null;
				state.markNotificationAsReadError = null;
			})
			.addCase(markNotificationAsReadAction.fulfilled, (state, action) => {
				state.markNotificationAsRead = false;
				state.markNotificationAsReadResp = action.payload;
				state.markNotificationAsReadError = null;
				// Update the notification in local state
				if (action.payload?.data?.notificationId) {
					const notification = state.notifications.find(
						(n) => n.notificationId === action.payload.data.notificationId
					);
					if (notification) {
						notification.isRead = true;
						state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
					}
				}
			})
			.addCase(markNotificationAsReadAction.rejected, (state, action) => {
				state.markNotificationAsRead = false;
				state.markNotificationAsReadResp = null;
				state.markNotificationAsReadError = action.payload;
			});
	},
});

export const {
	clearSubmitRatingState,
	clearNotificationsState,
	updateNotificationLocally,
	setSelectedChatFromNotification,
	clearSelectedChatFromNotification,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
