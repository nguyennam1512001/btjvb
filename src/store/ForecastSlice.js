import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getForecast } from '../services/ForecastService'; // Thay đường dẫn tới hàm getForecast từ API của bạn

// Thunk action để fetch dữ liệu từ API
export const fetchForecast = createAsyncThunk('forecast/fetchForecast', async (location) => {
    try {
        const res = await getForecast(location);
        return res;
    } catch (error) {
        throw error;
    }
});

const forecastSlice = createSlice({
    name: 'forecast',
    initialState: {
        forecastData: null,
        loading: false,
        error: null,
        days: [],
        isOpen: false,
        index: '',
        localtime: '',
        forecast24h: [],
    },
    reducers: {
        getIndexDetail: (state, action) => {
            state.index = action.payload;
            state.isOpen = true;
        },
        closePopup: (state, action) => {
            state.isOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.loading = false;
                state.forecastData = action.payload;
                state.days = action.payload ? (action.payload.forecast ? action.payload.forecast.forecastday : []) : [];
                state.localtime = action.payload
                    ? action.payload.location
                        ? action.payload.location.localtime
                        : ''
                    : '';
                state.forecast24h = [
                    ...(action.payload?.forecast?.forecastday[0]?.hour || []),
                    ...(action.payload?.forecast?.forecastday[1]?.hour || []),
                    ...(action.payload?.forecast?.forecastday[2]?.hour || []),
                ];
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchForecast.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
    },
});
export const { getIndexDetail, closePopup, getForecast24h } = forecastSlice.actions;
export default forecastSlice.reducer;
