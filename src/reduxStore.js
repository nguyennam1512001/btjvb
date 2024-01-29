import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import rootReducer from './store/rootReducer'; // Import rootReducer

// Tạo Redux store
const store = configureStore({
    reducer: rootReducer,
});

// Tạo persistor để lưu trữ dữ liệu
const persistor = persistStore(store);

export { store, persistor };
