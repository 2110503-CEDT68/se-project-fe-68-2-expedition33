import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interfaces";

type BookingState = {
    bookingItems: BookingItem[]
}

const initialState: BookingState = {
    bookingItems: []
}

export const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
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
    }
});

export const { setBookings: setBookings, addBooking: addBooking, removeBooking: removeBooking } = bookingSlice.actions;

export default bookingSlice.reducer;