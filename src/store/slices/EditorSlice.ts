import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface EditorState { 
    data: string,
    date: number,
}

const initialState: EditorState = {
    data: '',
    date: 0
}

export const EditorSlice = createSlice({
    name: "EditorSlice",
    initialState,
    reducers:{
        dataChange: (state, action: PayloadAction<string>) => {
            state.data = action.payload
        }
    }
})

export const { dataChange } = EditorSlice.actions;
export default EditorSlice.reducer;