import React from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';

const TemperatureChart = () => {
    let dispatch = useDispatch();
    let labels = [];
    let degree = [];
    const { forecastData } = useSelector((state) => state.forecast);
    if (forecastData?.forecast?.forecastday) {
        forecastData.forecast.forecastday.forEach((day) => {
            day.hour.forEach((item) => {
                labels.push(item.time.split(' ')[1]);
                degree.push(item.temp_f);
            });
        });
    }

    let minDegree = Math.min(...degree) - 10;
    let maxDegree = Math.max(...degree) + 10;

    const currentDate = new Date();

    // Đặt số phút và giây của currentDate thành 0
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);

    // Lấy ra số giờ của currentDate
    const currentHour = currentDate.getHours().toString().padStart(2, '0');

    const currentTimeIndex = labels.indexOf(currentHour + ':00');

    // Đặt pointStyle cho thời điểm hiện tại
    const pointStyles = degree.map((_, index) => {
        return index === currentTimeIndex ? 'circle' : false;
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature',
                data: degree, // Dữ liệu nhiệt độ theo ngày
                borderColor: '#3e95cd',
                backgroundColor: '#EEF4FE',
                fill: true,
                borderWidth: 2,
                pointStyle: pointStyles,
                cubicInterpolationMode: 'monotone',
                pointBackgroundColor: ['blue'],
            },
        ],
    };

    const options = {
        legend: {
            display: false,
            position: 'bottom',
        },
        plugins: {
            legend: {
                display: true,
                align: 'start',
                labels: {
                    boxWidth: 0, // Đặt độ rộng của ô vuông là 0 để ẩn nó đi
                    font: {
                        size: 13, // Kích thước chữ
                    },
                    color: '#626161',
                },
            },
            tooltip: {
                callbacks: {
                    title: function (tooltipItems, data) {
                        // Thay đổi tiêu đề của tooltip ở đây
                        return '';
                    },
                    label: function (tooltipItem, data) {
                        const index = tooltipItem.dataIndex;

                        // Kiểm tra xem chỉ số có phù hợp với chỉ số của thời điểm hiện tại không
                        if (index === currentTimeIndex) {
                            // Trả về nhiệt độ hiện tại kèm với đơn vị °F
                            return degree[index] + ' °F';
                        } else {
                            // Trả về nhiệt độ của các điểm khác
                            return degree[index] + ' °F';
                        }
                    },
                },
            },
        },
        scales: {
            x: {
                display: false,
                grid: {
                    display: false, // Loại bỏ các đường kẻ ô trên trục x
                },
            },
            y: {
                // beginAtZero: true,
                min: minDegree,
                max: maxDegree,
                display: false,
                grid: {
                    display: false, // Loại bỏ các đường kẻ ô trên trục y
                },
            },
        },
    };

    return (
        <div className="w-100 d-flex">
            <Line data={data} options={options} />
        </div>
    );
};

export default TemperatureChart;
