import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
// TODO: Define a class for the Weather object
class Weather {
    constructor(temperature, description, humidity, windSpeed, forecast) {
        this.temperature = temperature;
        this.description = description;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.forecast = forecast;
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        // TODO: Define the baseURL, API key, and city name properties
        this.baseURL = 'https://api.weatherapi.com/v1';
        this.apiKey = process.env.WEATHER_API_KEY || '';
    }
    // TODO: Create fetchLocationData method
    // private async fetchLocationData(query: string) {}
    async fetchLocationData(query) {
        const url = this.buildGeocodeQuery(query); // Use the buildGeocodeQuery method
        const response = await fetch(url);
        const data = await response.json();
        return this.destructureLocationData(data[0]);
    }
    // TODO: Create destructureLocationData method
    // private destructureLocationData(locationData: Coordinates): Coordinates {}
    destructureLocationData(locationData) {
        return {
            latitude: locationData.lat,
            longitude: locationData.lon,
        };
    }
    // TODO: Create buildGeocodeQuery method
    // private buildGeocodeQuery(): string {}
    buildGeocodeQuery(city) {
        return `${this.baseURL}/search.json?key=${this.apiKey}&q=${city}`;
    }
    // TODO: Create buildWeatherQuery method
    // private buildWeatherQuery(coordinates: Coordinates): string {}
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/current.json?key=${this.apiKey}&q=${coordinates.latitude},${coordinates.longitude}`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    // private async fetchAndDestructureLocationData() {}
    async fetchAndDestructureLocationData(city) {
        const locationData = await this.fetchLocationData(city);
        return locationData;
    }
    // TODO: Create fetchWeatherData method
    // private async fetchWeatherData(coordinates: Coordinates) {}
    async fetchWeatherData(coordinates) {
        const url = this.buildWeatherQuery(coordinates);
        const response = await fetch(url);
        const data = await response.json();
        return this.parseCurrentWeather(data);
    }
    // TODO: Build parseCurrentWeather method
    // private parseCurrentWeather(response: any) {}
    parseCurrentWeather(response) {
        const forecastArray = this.buildForecastArray(response.forecast.forecastday); // Pass only the forecast array
        return new Weather(response.current.temp_c, response.current.condition.text, response.current.humidity, response.current.wind_kph, forecastArray // Use the forecast array here
        );
    }
    // TODO: Complete buildForecastArray method
    // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
    buildForecastArray(weatherData) {
        return weatherData.map(day => ({
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            condition: day.day.condition.text,
        }));
    }
    // TODO: Complete getWeatherForCity method
    // async getWeatherForCity(city: string) {}
    async getWeatherForCity(city) {
        const coordinates = await this.fetchAndDestructureLocationData(city);
        const weatherData = await this.fetchWeatherData(coordinates);
        return weatherData;
    }
}
export default new WeatherService();
