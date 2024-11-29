import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registeredUsers: [],
    currentLogUser: ""
}


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})


export default userSlice.reducer;