import React from 'react';
import { useSelector } from 'react-redux';

import style from './Forecast24h.module.scss';
import clsx from 'clsx';
import cloudImg from '../../../assets/imgs/cloud.png';
import rainImg from '../../../assets/imgs/rain.png';

const Forecast24h = () => {
    let data24h = [];
    let time = '';
    const { forecast24h, localtime } = useSelector((state) => state.forecast);
    if (forecast24h && forecast24h.length > 0) {
        let currentIndex = 0;
        if (localtime) {
            const [datePart, timePart] = localtime.split(' ');
            const [hour, minute] = timePart.split(':');
            time = hour.padStart(2, '0') + ':00';
            currentIndex = forecast24h.findIndex((item) => {
                return item.time.split(' ')[1] === time;
            });
        }

        for (let i = currentIndex; i < currentIndex + 24 && i < forecast24h.length; i += 2) {
            if (forecast24h[i]) {
                data24h.push(forecast24h[i]);
            }
        }
    }

    return (
        <div className="">
            <div className={clsx(style.list, 'd-flex')}>
                {data24h &&
                    data24h.map((item, index) => {
                        return (
                            <div key={index} className={clsx(style.item)}>
                                <p>{item.temp_c}&nbsp;°C</p>
                                <p>
                                    {item.condition.icon && (
                                        <img width="40" src={item.condition.icon} alt="cloudy"></img>
                                    )}
                                </p>
                                <p>{time === item.time.split(' ')[1] ? 'Bây giờ' : item.time.split(' ')[1]}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Forecast24h;
