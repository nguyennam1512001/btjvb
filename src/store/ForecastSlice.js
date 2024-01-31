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
        isLoading: false,
        error: null,
        days: [],
        isOpen: false,
        index: '',
        localtime: '',
        forecast24h: [],
        currentCity: '',
    },
    reducers: {
        getIndexDetail: (state, action) => {
            state.index = action.payload;
            state.isOpen = true;
        },
        closePopup: (state, action) => {
            state.isOpen = false;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCurrentCity: (state, action) => {
            state.currentCity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.fulfilled, (state, action) => {
                const payload = action.payload;

                const isDataEmpty = !payload || Object.keys(payload).length === 0;

                const isForecastEmpty = isDataEmpty || !payload.forecast || !payload.forecast.forecastday;
                const isLocationEmpty = isDataEmpty || !payload.location || !payload.location.localtime;

                const forecast24h = isForecastEmpty
                    ? []
                    : payload.forecast.forecastday.slice(0, 3).flatMap((day) => day.hour);

                state.isLoading = isDataEmpty || isForecastEmpty || isLocationEmpty;
                state.forecastData = isDataEmpty ? null : payload;
                state.days = isForecastEmpty ? [] : payload.forecast.forecastday;
                state.localtime = isLocationEmpty ? '' : payload.location.localtime;
                state.forecast24h = forecast24h;
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchForecast.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
    },
});
export const { getIndexDetail, closePopup, getForecast24h, setIsLoading, setCurrentCity } = forecastSlice.actions;
export default forecastSlice.reducer;
