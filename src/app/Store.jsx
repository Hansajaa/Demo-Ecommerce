import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../feature/users/UserSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage' //Default to localstorage
import { combineReducers } from '@reduxjs/toolkit'

// Persist configuration
const persistConfig = {
    key: 'root',
    storage, // Use localStorage
};

//combine reducers
const rootReducer = combineReducers({
    users: UserReducer,
})

//create a persist reducer
const persistReducerObj = persistReducer(persistConfig,rootReducer);


//Configure store
const store = configureStore({
    reducer: persistReducerObj
})

//persist store
const persistor = persistStore(store);

export {store, persistor};


