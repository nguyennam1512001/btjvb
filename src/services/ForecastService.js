import axios from 'axios';

export const getForecast = async (location) => {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=f5ac4be4a19c47d8a3e42522222112&q=${location}&days=3&aqi=no&alerts=yes`);
        return response.data;
    } catch (error) {
        throw error; 
    }
};
