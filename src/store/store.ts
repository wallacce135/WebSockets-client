import { configureStore } from '@reduxjs/toolkit';
import EditorReducer from './slices/EditorSlice';

export const store = configureStore({
    reducer: {
        draft: EditorReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch