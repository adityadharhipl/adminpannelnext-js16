import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { setCookie, removeCookie } from '../../utils/cookies';

interface AuthState {
    user: any | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            // const response = await axiosInstance.post('/auth/signup', userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Async thunk for updating profile
export const updateMyProfile = createAsyncThunk(
    'auth/updateProfile',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put('/users/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Profile update failed');
        }
    }
);

// Async thunk for changing password
export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (passwordData: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put('/users/change-password', passwordData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Password change failed');
        }
    }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send reset email');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            removeCookie('token');
        },
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.token) {
                state.token = action.payload.token;
                state.isAuthenticated = true;
                setCookie('token', action.payload.token);
            }
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            setCookie('token', action.payload.token);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Update Profile
        builder.addCase(updateMyProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateMyProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            // The backend returns { success: true, msg: "...", user: { ... } }
            // or sometimes directly the user object depending on the controller provided.
            // Based on user snippet: res.json({ success: true, msg: "...", user: { ... } });
            // So we need to access action.payload.user
            if (action.payload.user) {
                state.user = { ...state.user, ...action.payload.user };
            } else {
                // Fallback if structure is different
                state.user = { ...state.user, ...action.payload };
            }
        });
        builder.addCase(updateMyProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Change Password
        builder.addCase(changePassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(changePassword.fulfilled, (state) => {
            state.isLoading = false;
            // No state change needed for user/token usually, just success indication
        });
        builder.addCase(changePassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });


        // Forgot Password
        builder.addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(forgotPassword.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export const { logout, setCredentials, updateUser } = authSlice.actions;
export default authSlice.reducer;
