import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            id: -1,
            username: "",
            isAuthed: false
        }
    },
    reducers: {
        create: (state, action) => {
            state.value.id = action.payload.id;
            state.value.username = action.payload.username;
            state.value.isAuthed = true;
        },
        clear: (state) => {
            state.value.id = -1;
            state.value.username = "";
            state.value.isAuthed = false;
        }
    }
});

export const {create, clear} = userSlice.actions;
export default userSlice.reducer;