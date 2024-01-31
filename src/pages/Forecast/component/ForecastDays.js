import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import style from './ForecastDays.module.scss';
import clsx from 'clsx';
import { getCurrentTimeFormat } from '../../../utils/locationUtil';
import { getIndexDetail } from '../../../store/ForecastSlice';
import cloudImg from '../../../assets/imgs/cloud.png';
import sunyImg from '../../../assets/imgs/suny.png';
const ForecastDays = () => {
    let dispatch = useDispatch();
    const currentDay = getCurrentTimeFormat();

    let days = [];
    const { forecastData } = useSelector((state) => state.forecast);
    if (forecastData?.forecast?.forecastday) {
        forecastData.forecast.forecastday.forEach((day) => {
            let date = new Date(day.hour[0].time);
            let options = { month: 'short', day: 'numeric' };
            let formattedDate = date.toLocaleDateString('en-US', options);
            let item = {
                time: formattedDate,
                humidity: day.hour[0].humidity,
                cloud: day.hour[0].cloud,
            };
            days.push(item);
        });
    }

    const handleOpenPopup = (index) => {
        dispatch(getIndexDetail(index));
    };
    return (
        <div className="d-flex justify-content-around gap-3">
            {days &&
                days.length > 0 &&
                days.map((day, index) => {
                    return (
                        <div
                            key={index}
                            className={clsx(style.day, {
                                [style.active]: day.time === currentDay.month_date,
                            })}
                            onClick={() => handleOpenPopup(index)}
                        >
                            <div className={clsx(style.time)}>{day.time}</div>
                            <div className={clsx(style.temperature)}>
                                <div className="d-flex justify-content-center align-items-center gap-5">
                                    {day.cloud >= 50 ? (
                                        <div className={clsx(style.temperature_icon, 'material-icons')}>
                                            {/* cloud_queue */}
                                            <img width="50" src={cloudImg} alt="cloudy"></img>
                                        </div>
                                    ) : (
                                        <div className={clsx(style.temperature_icon, style.sunny, 'material-icons')}>
                                            {/* wb_sunny */}
                                            <img width="50" src={sunyImg} alt="sunny"></img>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={clsx('d-flex justify-content-evenly')}>
                                <div className={clsx(style.humidity)}>
                                    Humidity
                                    <p>{day.humidity}%</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default ForecastDays;
