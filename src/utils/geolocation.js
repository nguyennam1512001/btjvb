export function getCurrentCityName(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiKey = 'afad171e6912486cbff380bd9ebf33f0';
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const city = data.results[0].components.city;
                    callback(city);
                })
                .catch((error) => {
                    console.log('Error:', error);
                    callback(null);
                });
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
        callback(null);
    }
}
