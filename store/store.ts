import userReducer from "@/store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
} from "redux-persist";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  userReducer
);

export type UserPayload = {
    user: {
        value: {
            id: number,
            username: string,
            isAuthed: boolean
        }
    }
}

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
       },
    })
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;