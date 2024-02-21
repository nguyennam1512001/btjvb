import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import forecastReducer from './ForecastSlice';
import CRUDReducer from './CRUDSlice';

const persistForecastConfig = {
    key: 'forecast',
    storage: storage,
    whitelist: ['forecastData', 'localtime'],
};

// Combine các reducers
const rootReducer = combineReducers({
    forecast: persistReducer(persistForecastConfig, forecastReducer),
    CRUD: CRUDReducer,
});

export default rootReducer;
