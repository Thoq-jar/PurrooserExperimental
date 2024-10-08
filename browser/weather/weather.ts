// noinspection DuplicatedCode,HttpUrlsUsage,JSUnresolvedReference

interface WeatherCondition {
  description: string;
  iconUrl: string;
}

$((): void => {
  const $city = $('#city');
  const $temperature = $('#temperature');
  const $unit = $('#unit');
  const $weatherIcon = $('#weather-icon');
  const $weatherDescription = $('#weather-description');
  const $weatherContainer = $('.weather-container');
  const $datetime = $('#datetime');
  const $humidity = $('#humidity');

  setInterval(updateDateTime, 1000);
  fetchWeather();

  function updateDateTime() {
    $datetime.text(new Date().toLocaleString());
  }

  function fetchWeather() {
    $.getJSON('http://ip-api.com/json', (locationData: any) => {
      const city: string | undefined = locationData.city;
      const lat: number | undefined = locationData.lat;
      const lon: number | undefined = locationData.lon;

      if (!city || !lat || !lon) {
        alert("Error parsing location data");
        return;
      }

      $.ajax({
        url: `https://purrooser-weather.vercel.app/weather?lat=${lat}&lon=${lon}`,
        method: 'GET',
        headers: { 'Version': 'Purrooser/1.0' },
        success: (weatherData: any) => {
          const temperature = Math.round(weatherData.main?.temp ?? 0);
          const weatherCode = weatherData.weather?.[0]?.id ?? 0;
          const humidity = weatherData.main?.humidity ?? 0;
          const { description, iconUrl } = getWeatherConditionDescription(weatherCode);
          const unit = "°F";

          $city.text(city);
          $temperature.text(`${temperature}`);
          $unit.text(`${unit}`);
          $weatherIcon.attr('src', iconUrl);
          $weatherDescription.text(description);
          $humidity.text(`${humidity}`);

          $weatherContainer.css({ 'display': 'flex' });
          $weatherDescription.show();

          updateDateTime();
        },
        error: () => alert("Error loading weather")
      });
    }).fail(() => alert("Error getting IP"));
  }

  function getWeatherConditionDescription(weatherCode: number): WeatherCondition {
    // Assign a very high number to stand in for the unknown weather condition
    const UNKNOWN_WEATHER_CONDITION = 1000;

    const weatherConditions: { [key: number]: WeatherCondition } = {
      200: { description: "Thunderstorm with light rain", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      201: { description: "Thunderstorm with rain", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      202: { description: "Thunderstorm with heavy rain", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      210: { description: "Light thunderstorm", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      211: { description: "Thunderstorm", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      212: { description: "Heavy thunderstorm", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      221: { description: "Ragged thunderstorm", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      230: { description: "Thunderstorm with light drizzle", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      231: { description: "Thunderstorm with drizzle", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      232: { description: "Thunderstorm with heavy drizzle", iconUrl: "https://openweathermap.org/img/wn/11d@2x.png" },
      300: { description: "Light intensity drizzle", iconUrl: "https://openweathermap.org/img/wn/09d@2x.png" },
      301: { description: "Drizzle", iconUrl: "https://openweathermap.org/img/wn/09d@2x.png" },
      302: { description: "Heavy intensity drizzle", iconUrl: "https://openweathermap.org/img/wn/09d@2x.png" },
      310: { description: "Light intensity drizzle rain", iconUrl: "https://openweathermap.org/img/wn/09d@2x.png" },
      311: { description: "Drizzle rain", iconUrl: "https://openweathermap.org/img/wn/09d@2x.png" },
      312: { description: "Heavy intensity drizzle rain", iconUrl: "https://openweathermap.org/img/wn/09d@2x.png" },
      500: { description: "Light rain", iconUrl: "https://openweathermap.org/img/wn/10d@2x.png" },
      501: { description: "Moderate rain", iconUrl: "https://openweathermap.org/img/wn/10d@2x.png" },
      502: { description: "Heavy intensity rain", iconUrl: "https://openweathermap.org/img/wn/10d@2x.png" },
      503: { description: "Very heavy rain", iconUrl: "https://openweathermap.org/img/wn/10d@2x.png" },
      504: { description: "Extreme rain", iconUrl: "https://openweathermap.org/img/wn/10d@2x.png" },
      511: { description: "Freezing rain", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      520: { description: "Light intensity shower rain", iconUrl: "https://openweathermap.org/img/wn/09d@2x.png" },
      521: { description: "Shower rain", iconUrl: "https://openweathermap.org/img/wn/09d@2x.png" },
      522: { description: "Heavy intensity shower rain", iconUrl: "https://openweathermap.org/img/wn/09d@2x.png" },
      600: { description: "Light snow", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      601: { description: "Snow", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      602: { description: "Heavy snow", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      611: { description: "Sleet", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      612: { description: "Light shower sleet", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      615: { description: "Shower sleet", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      620: { description: "Light rain and snow", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      621: { description: "Rain and snow", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      622: { description: "Heavy rain and snow", iconUrl: "https://openweathermap.org/img/wn/13d@2x.png" },
      701: { description: "Mist", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      711: { description: "Smoke", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      721: { description: "Haze", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      731: { description: "Sand, dust whirls", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      741: { description: "Fog", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      751: { description: "Sand", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      761: { description: "Dust", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      771: { description: "Squall", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      781: { description: "Tornado", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      800: { description: "Clear sky", iconUrl: "https://openweathermap.org/img/wn/01d@2x.png" },
      801: { description: "Few clouds", iconUrl: "https://openweathermap.org/img/wn/02d@2x.png" },
      802: { description: "Scattered clouds", iconUrl: "https://openweathermap.org/img/wn/03d@2x.png" },
      803: { description: "Broken clouds", iconUrl: "https://openweathermap.org/img/wn/04d@2x.png" },
      804: { description: "Overcast clouds", iconUrl: "https://openweathermap.org/img/wn/04d@2x.png" },
      900: { description: "Tornado", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      901: { description: "Tropical storm", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      902: { description: "Hurricane", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      903: { description: "Cold", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      904: { description: "Hot", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      905: { description: "Windy", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      906: { description: "Hail", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      951: { description: "Calm", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      952: { description: "Light breeze", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      953: { description: "Gentle breeze", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      954: { description: "Moderate breeze", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      955: { description: "Fresh breeze", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      956: { description: "Strong breeze", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      957: { description: "High wind, near gale", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      958: { description: "Gale", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      959: { description: "Severe gale", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      960: { description: "Storm", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      961: { description: "Violent storm", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      962: { description: "Hurricane", iconUrl: "https://openweathermap.org/img/wn/50d@2x.png" },
      [UNKNOWN_WEATHER_CONDITION]: { description: "Unknown weather condition", iconUrl: "" }
    };

    return weatherConditions[weatherCode] || weatherConditions[UNKNOWN_WEATHER_CONDITION];
  }
});