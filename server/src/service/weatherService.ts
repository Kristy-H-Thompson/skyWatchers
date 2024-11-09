import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  description: string;
  forecast: string[];

  constructor(temperature: number, description: string, forecast: string[]) {
    this.temperature = temperature;
    this.description = description;
    this.forecast = forecast;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = process.env.API_BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const geocodeQuery = this.buildGeocodeQuery(query);
    console.log('Geocode query:', geocodeQuery);
    const response = await fetch(geocodeQuery);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch error:', response.status, response.statusText, errorText);
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    console.log('API response:', data);

    if (data.length === 0) {
      throw new Error('Location not found');
    }
    return this.destructureLocationData(data[0]);
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    if (!locationData.lat || !locationData.lon) {
      throw new Error('Invalid location data');
    }
    return {
      lat: locationData.lat,
      lon: locationData.lon
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    const query =`${this.baseURL}/geo/1.0/direct?q=${encodeURIComponent(city)}&appid=${this.apiKey}`;
    console.log('Geocode query:', query);
    return query;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const query = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    console.log('Weather query:', query);
    return query;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    try {
      const locationData = await this.fetchLocationData(city);
      return locationData;
    } catch (error) {
      console.error('Failed to fetch location data:', error);
      throw error;
    }
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return await response.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather{
    const temperature = response.list[0].main.temp;
    const description = response.list[0].weather[0].description;
    const forecast = response.list.map((item: any) => item.weather[0].description);
    return new Weather(temperature, description, forecast);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forcastArray = [currentWeather];
    const forecastData = weatherData.map(item => new Weather(item.main.temp, item.weather[0].description, []));
    return forcastArray.concat(forecastData);
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    if (!city) {
      throw new Error('City name is required');
    }
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
    return forecastArray;
  }
}

export default new WeatherService();