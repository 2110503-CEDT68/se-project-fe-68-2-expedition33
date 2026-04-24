import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserItem } from "@/../interfaces";
import getUserProfile from "@/libs/getUserProfile";

export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (token: string) => {
        const response = await getUserProfile(token);
        return response.data;
    }
);

type UserState = {
    userProfile: UserItem | null;
    loading: boolean;
}

const initialState: UserState = {
    userProfile: null,
    loading: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.userProfile = null;
        },
        setUser: (state, action: PayloadAction<UserItem>) => {
            state.userProfile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserItem>) => {
            state.loading = false;
            state.userProfile = action.payload;
        })
        .addCase(fetchUserProfile.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
