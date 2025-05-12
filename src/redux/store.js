import { configureStore } from '@reduxjs/toolkit';
import systemSlice from './Reducers/systemSlice';
const store = configureStore({
    reducer: {
        getUser : systemSlice,
    },
} 
)

export default store;