import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Commission = {
    id: string;
    user_name: string;
    user_email: string;
    description: string;
    status: string;
    created_at: string;
};

interface CommissionsState {
    data: Commission[];
    loading: boolean;
    error: string | null;
    totalRecords: number;
    currentPage: number;
}

const initialState: CommissionsState = {
    data: [],
    loading: false,
    error: null,
    totalRecords: 0,
    currentPage: 1,
};

const commissionsSlice = createSlice({
    name: 'commissions',
    initialState,
    reducers: {
        fetchCommissionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCommissionsSuccess: (state, action: PayloadAction<{ data: Commission[]; totalRecords: number; currentPage: number }>) => {
            state.data = action.payload.data;
            state.totalRecords = action.payload.totalRecords;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
        },
        fetchCommissionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchCommissionsStart, fetchCommissionsSuccess, fetchCommissionsFailure } = commissionsSlice.actions;
export default commissionsSlice.reducer;
