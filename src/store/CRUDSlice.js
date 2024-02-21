import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const CRUDSlice = createSlice({
    name: 'crud',
    initialState: {
        userData: [],
        error: '',
        isUpdate: false,
    },
    reducers: {
        changeError: (state, action) => {
            state.error = action.payload;
        },
        setIsupdate: (state, action) => {
            state.isUpdate = action.payload;
        },
    },
});
export const { changeError, setIsupdate } = CRUDSlice.actions;
export default CRUDSlice.reducer;
