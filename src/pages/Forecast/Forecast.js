import React, { useEffect, useState } from 'react';
import Select from 'react-select';
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

const options = [
    { value: 'ha noi', label: 'Hà Nội' },
    { value: 'hai phong', label: 'Hải Phòng' },
    { value: 'vinh phuc', label: 'Vĩnh Phúc' },
];

const Forecast = () => {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ value: '', label: '' });
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
        let cityNameFomat = convertToLowerCaseAndRemoveAccents(currentCity);
        setSelectedOption({ value: cityNameFomat, label: currentCity });
    }, [currentCity]);

    useEffect(() => {
        setIsComponentMounted(true);
        if (selectedOption.value) {
            dispatch(fetchForecast(selectedOption.value));
        }
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
                            <Select
                                className="flex-grow-2"
                                placeholder=""
                                value={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4">
                                <div className={clsx(style.time)}>{time}</div>
                                <div className={clsx(style.temperature)}>
                                    <div className="d-flex justify-content-center align-items-center gap-5">
                                        {forecastData && forecastData.current && forecastData.current.cloud >= 50 ? (
                                            <div className={clsx(style.temperature_icon, 'material-icons')}>
                                                cloud_queue
                                                <span className={clsx(style.icon_chilren, 'material-icons')}>
                                                    cloud_queue
                                                </span>
                                            </div>
                                        ) : (
                                            <span></span>
                                        )}
                                        <h1 className={clsx(style.temperature_degree)}>
                                            {forecastData && forecastData.current && forecastData.current.temp_f}
                                            <span>°F</span>
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
