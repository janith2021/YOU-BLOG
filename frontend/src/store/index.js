import {configureStore, createSlice} from '@reduxjs/toolkit'

const authenticationSlice = createSlice({
    name : "authentication",
    initialState : {LoggedInUser : false},
    reducers : {
        login(state){
            state.LoggedInUser = true
        },
        logout(state){
            state.LoggedInUser = false
            localStorage.removeItem('userID')
        }
    }
})

export const authenticationActions = authenticationSlice.actions

export const store = configureStore({
    reducer : authenticationSlice.reducer
})