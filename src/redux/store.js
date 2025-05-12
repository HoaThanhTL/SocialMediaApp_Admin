import { configureStore } from '@reduxjs/toolkit';
import systemSlice from './Reducers/systemSlice';
const store = configureStore({
    reducer: {
        system : systemSlice,
    },
} 
)

export default store;