import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookingSlice from "./features/bookingSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

function createPersistStorage(): WebStorage {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return {
            getItem: () => {
                return Promise.resolve(null);
            },
            setItem: () => {
                return Promise.resolve();
            },
            removeItem: () => {
                return Promise.resolve();
            },
        }
    }

    return createWebStorage("local");
}

const storage = createPersistStorage();

const persistConfig = {
    key: "rootPersist",
    storage
}

const rootReducer = combineReducers({
    bookings: bookingSlice
});

const reduxPersistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: reduxPersistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;