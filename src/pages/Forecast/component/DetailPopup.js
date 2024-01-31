import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './DetailPopup.module.scss';
import clsx from 'clsx';
import { closePopup } from '../../../store/ForecastSlice';

const DetailPopup = () => {
    let dispatch = useDispatch();
    const { index } = useSelector((state) => state.forecast);
    const { days } = useSelector((state) => state.forecast);

    let date = days[index].date;
    let day = days[index].day;
    let astro = days[index].astro;
    return (
        <div className={clsx(style.detail_popup)}>
            <div className={clsx(style.close_icon, 'material-icons')} onClick={() => dispatch(closePopup())}>
                highlight_off
            </div>
            <h4 className={clsx(style.date, 'fw-bolder py-3')}>{date}</h4>
            <div className={clsx(style.content, 'd-flex justify-content-between')}>
                <div className={clsx(style.content_left)}>
                    <div className={clsx(style)}>
                        <p className={clsx(style.keywords)}>Max Temperature:</p>
                        <p className={clsx(style.value)}>
                            {day.maxtemp_c}°C ({day.maxtemp_f}°F)
                        </p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Min Temperature:</p>{' '}
                        <p className={clsx(style.value)}>
                            {day.mintemp_c}°C ({day.mintemp_f}°F)
                        </p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Average Temperature:</p>{' '}
                        <p className={clsx(style.value)}>
                            {day.avgtemp_c}°C ({day.avgtemp_f}°F)
                        </p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Humidity:</p>{' '}
                        <p className={clsx(style.value)}>{day.avghumidity}%</p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Chance of Rain:</p>{' '}
                        <p className={clsx(style.value)}>{day.daily_chance_of_rain}%</p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Chance of Snow:</p>{' '}
                        <p className={clsx(style.value)}>{day.daily_chance_of_snow}%</p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>UV Index:</p> <p className={clsx(style.value)}>{day.uv}</p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Condition:</p>{' '}
                        <p className={clsx(style.value)}>{day.condition.text}</p>
                    </div>
                </div>
                <div className={clsx(style.content_right)}>
                    <div>
                        <p className={clsx(style.keywords)}>Sunrise:</p>{' '}
                        <p className={clsx(style.value)}>{astro.sunrise}</p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Sunset:</p>{' '}
                        <p className={clsx(style.value)}>{astro.sunset}</p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Moonrise:</p>{' '}
                        <p className={clsx(style.value)}>{astro.moonrise}</p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Moonset:</p>{' '}
                        <p className={clsx(style.value)}>{astro.moonset}</p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Moon Phase:</p>{' '}
                        <p className={clsx(style.value)}>{astro.moon_phase}</p>
                    </div>
                    <div>
                        <p className={clsx(style.keywords)}>Moon Illumination:</p>{' '}
                        <p className={clsx(style.value)}>{astro.moon_illumination}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPopup;
