import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import peopleSlice from "../features/people/peopleSlice";
import adminSlice from "../features/admin/adminSlice";
import cancelledPeopleSlice from "../features/cancelledPeople/cancelledPeopleSlice";
import reportsSlice from "../features/reports/reportsSlice";
import resourcesSlice from "../features/resources/resourcesSlice";
import statisticsSlice from "../features/statistics/statisticsSlice";
import programmingSlice from "../features/programming/programmingSlice";
import calendarSlice from "../features/calendar/calendarSlice";
import tempSlice from "../features/temp/tempSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        people: peopleSlice,
        admin: adminSlice,
        cancelledPeople: cancelledPeopleSlice,
        reports: reportsSlice,
        statistics: statisticsSlice,
        resources: resourcesSlice,
        programming: programmingSlice,
        calendar: calendarSlice,
        temp: tempSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
