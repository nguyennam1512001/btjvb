import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import forecastReducer from './ForecastSlice';

const persistConfig = {
    key: 'forecast',
    storage: storage,
    whitelist: ['forecastData', 'localtime'],
};

// Combine các reducers
const rootReducer = combineReducers({
    forecast: persistReducer(persistConfig, forecastReducer),
});

export default rootReducer;
