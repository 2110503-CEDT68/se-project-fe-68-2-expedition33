import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BookingItem } from "@/../interfaces";
import getBookings from "@/libs/getBookings";

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (token: string) => {
    const response = await getBookings(token);
    return response.data;
  }
);

type BookingState = {
    bookingItems: BookingItem[];
    loading: boolean;
}

const initialState: BookingState = {
    bookingItems: [],
    loading: false,
}

export const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        clearBookings: (state) => {
            state.bookingItems = [];
        },
        setBookings: (state, action: PayloadAction<BookingItem[]>) => {
            state.bookingItems = action.payload;
        },
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookingItems.push(action.payload);
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookingItems = state.bookingItems.filter(obj => {
                return obj.id !== action.payload.id;
            });
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserBookings.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserBookings.fulfilled, (state, action: PayloadAction<BookingItem[]>) => {
            state.loading = false;
            state.bookingItems = action.payload;
        })
        .addCase(fetchUserBookings.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { clearBookings, setBookings, addBooking, removeBooking } = bookingSlice.actions;

export default bookingSlice.reducer;