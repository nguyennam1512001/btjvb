import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { fetchForecast, setIsLoading, setCurrentCity } from '../../store/ForecastSlice';
import style from './Forecast.module.scss';
import clsx from 'clsx';
import { formatLocalTime, convertToLowerCaseAndRemoveAccents } from '../../utils/locationUtil';
import TemperatureChart from './component/TemperatureChart';
import ForecastDays from './component/ForecastDays';
import DetailPopup from './component/DetailPopup';
import { getCurrentCityName } from '../../utils/geolocation';
import Forecast24h from './component/Forecast24h';

const Forecast = () => {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const { forecastData, isLoading, localtime, isOpen, currentCity } = useSelector((state) => state.forecast);
    let dispatch = useDispatch();
    let time = formatLocalTime(localtime);
    useEffect(() => {
        dispatch(setIsLoading(true));
        getCurrentCityName((city) => {
            try {
                dispatch(setCurrentCity(city));
            } catch (e) {
                console.log('get city name fail');
            }
        });
    }, []);

    useEffect(() => {
        setSelectedOption(currentCity);
    }, [currentCity]);

    useEffect(() => {
        setIsComponentMounted(true);
        const delayedDispatch = debounce((option) => {
            if (option) {
                dispatch(fetchForecast(convertToLowerCaseAndRemoveAccents(option)));
            }
        }, 600);
        delayedDispatch(selectedOption);
        return () => {
            delayedDispatch.cancel(); // Hủy debounce nếu component bị unmount
        };
    }, [dispatch, selectedOption]);

    return (
        <div className="container mt-5">
            <div className={clsx(style.forecast, 'row')}>
                <div className={clsx(style.forecast_content)}>
                    {isLoading && isComponentMounted && (
                        <div className={clsx(style.spinner, 'spinner-border text-secondary')} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    <div className="col-12 location">
                        <div className="d-flex align-items-center">
                            <label className="flex-grow-3">Your city</label> &nbsp;&nbsp;
                            <input
                                className="flex-grow-2 form-control w-auto fs-4"
                                placeholder="Search City"
                                value={selectedOption}
                                onChange={(e) => {
                                    setSelectedOption(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4">
                                <div className={clsx(style.time)}>{time}</div>
                                <div className={clsx(style.temperature)}>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {forecastData &&
                                            forecastData.current &&
                                            forecastData.current.condition.icon && (
                                                <img
                                                    width="100"
                                                    src={forecastData.current.condition.icon}
                                                    alt="cloudy"
                                                ></img>
                                            )}
                                        <h1 className={clsx(style.temperature_degree)}>
                                            {forecastData && forecastData.current && forecastData.current.temp_c}
                                            <span>°C</span>
                                        </h1>
                                    </div>
                                </div>
                                <p className="fs-2 fw-bolder mt-3 text-center">
                                    {forecastData && forecastData.current && forecastData.current.cloud >= 50
                                        ? 'Cloudy'
                                        : 'Partly cloudy'}
                                </p>
                                <div className={clsx('d-flex justify-content-evenly')}>
                                    <div className={clsx(style.humidity)}>
                                        Humidity
                                        <p>{forecastData && forecastData.current && forecastData.current.humidity}%</p>
                                    </div>
                                    <div className={clsx(style.wind_speed)}>
                                        Wind speed
                                        <p>
                                            {forecastData && forecastData.current && forecastData.current.wind_kph}
                                            &nbsp;Km/h
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <TemperatureChart />
                                <Forecast24h />
                                <ForecastDays />
                            </div>
                        </div>
                    </div>
                    {isOpen && <DetailPopup />}
                </div>
            </div>
        </div>
    );
};

export default Forecast;
