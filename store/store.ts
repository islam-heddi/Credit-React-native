import userReducer from "@/store/userSlice";
import { configureStore } from "@reduxjs/toolkit";

type UserPayload = {
    user: {
        value: {
            id: number,
            username: string,
            isAuthed: boolean
        }
    }
}

const loadState: () => UserPayload = () => {
  try {
    const serialized = localStorage.getItem("reduxState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    return undefined;
  }
};
const saveState = (state: any) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("reduxState", serialized);
    } catch (e) {
        console.error("Could not save state", e);
    return undefined;
    }
}
const preloadedState = loadState()
export const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState
});
store.subscribe(() => {
    saveState(store.getState())
})
