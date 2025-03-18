import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    email: string | null;
    role: string | null;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    email: null,
    role: null,
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; email: string; role: string }>) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.token = null;
            state.email = null;
            state.role = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
