export function getCurrentCityName() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Gọi API của bất kỳ dịch vụ nào bạn muốn sử dụng với latitude và longitude để lấy tên tỉnh/thành phố
            // Ví dụ: sử dụng API của OpenCage Geocoding
            const apiKey = 'afad171e6912486cbff380bd9ebf33f0';
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const city = data.results[0].components.city; // Lấy tên thành phố từ dữ liệu trả về
                    // console.log(city);
                    return city;
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}
// Sử dụng hàm để lấy tên thành phố

//

export function getCurrentTimeFormat() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridian = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = days[date.getDay()];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];

    const currentDate = date.getDate();
    const currentYear = date.getFullYear();

    // lấy ra thời gian dạng ===> "9:34 pm, Fri, Jan 26, 2024"
    const all = `${formattedHours}:${
        minutes < 10 ? '0' : ''
    }${minutes} ${meridian}, ${dayOfWeek}, ${month} ${currentDate}, ${currentYear}`;

    // lấy ra thời gian dạng ===> "Jan 26"
    const month_date = `${month} ${currentDate}`;
    let formattedTime = {
        all: all,
        month_date: month_date,
    };
    return formattedTime;
}

export function formatLocalTime(time) {
    if (time) {
        const inputDate = new Date(time);
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = inputDate.toLocaleString('en-US', { ...options, hour12: true });

        return formattedDate;
    }
}

// chuyển sang chữ không dấu và viết thường
export function convertToLowerCaseAndRemoveAccents(str) {
    if (!str || typeof str !== 'string' || str.trim() === '') {
        return ''; // Trả về chuỗi trống nếu str không hợp lệ
    }

    const lowerCase = str.toLowerCase(); // Chuyển đổi thành chữ thường
    const normalizedString = lowerCase.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Loại bỏ dấu

    return normalizedString;
}
