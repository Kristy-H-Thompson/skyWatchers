import dotenv from 'dotenv';
dotenv.config();


/* 
------------------------------------------------------------------------------------------------------------

DEFINE THE COORDINATES OBJECT
  - // TODO: Define an interface for the Coordinates object

------------------------------------------------------------------------------------------------------------ 
*/

// Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}



/* 
------------------------------------------------------------------------------------------------------------

DEFINE THE WEATHER OBJECT WITH A CONSTRUCTOR
  - // TODO: Define a class for the Weather object

------------------------------------------------------------------------------------------------------------ 
*/

// Define a class for the Weather object
class Weather {
  // must include data types
  city: string;
  date: string;
  icon: string;
  description: string;
  tempF: number;
  windSpeed: string;
  humidity: string;

// Don't forget the constructor because it is typescript
  constructor(city: string, date: string, icon: string, description: string, temperature: number, windSpeed: string, humidity: string) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.description = description;
    this.tempF = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}



/* 
------------------------------------------------------------------------------------------------------------

WEATHERSERVICE CLASS
   - // TODO: Complete the WeatherService class
  - // TODO: Define the baseURL, API key, and city name properties
  - // TODO: Create fetchLocationData method

------------------------------------------------------------------------------------------------------------ 
*/

// Complete the WeatherService class
class WeatherService {
  // Define the baseURL, API key, and city name properties
  private baseURL: string = process.env.API_BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';
  // Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
  // call the geocodeQuery
    const geocodeQuery = this.buildGeocodeQuery(query);
    const response = await fetch(geocodeQuery);
  // error handling
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch error:', response.status, response.statusText, errorText);
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();

    if (data.length === 0) {
      throw new Error('Location not found');
    }
    return this.destructureLocationData(data[0]);
  }



/* 
------------------------------------------------------------------------------------------------------------

DESTRUCTURE LOACATION DATA
   - // TODO: Create destructureLocationData method

------------------------------------------------------------------------------------------------------------ 
*/
  // Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    // error handling
    if (!locationData.lat || !locationData.lon) {
      throw new Error('Invalid location data');
    }
    // return the latitude and longitude to be able to search cities later
    return {
      lat: locationData.lat,
      lon: locationData.lon
    };
  }


 /* 
------------------------------------------------------------------------------------------------------------

GEOCODE QUERY
  - // TODO: Create buildGeocodeQuery method

------------------------------------------------------------------------------------------------------------ 
*/ 
  // Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    // Build API URL
    const query =`${this.baseURL}/geo/1.0/direct?q=${city}&appid=${this.apiKey}`;
    console.log(query);
    return query;
  }


   /* 
------------------------------------------------------------------------------------------------------------

WEATHER QUERY
  - // TODO: Create buildWeatherQuery method

------------------------------------------------------------------------------------------------------------ 
*/ 
  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    // Build API URL
    const query = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
    console.log(query);
    return query;
  }

/* 
------------------------------------------------------------------------------------------------------------

FETCH AND DESTRUCTURE DATA
  -  // TODO: Create fetchAndDestructureLocationData method
  -  // TODO: Create fetchWeatherData method
  -  // TODO: Build parseCurrentWeather method

------------------------------------------------------------------------------------------------------------ 
*/ 
  // Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    try {
      const locationData = await this.fetchLocationData(city);
      return locationData;
    } catch (error) {
      console.error('Failed to fetch location data:', error);
      throw error;
    }
  }
  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return await response.json();
  }
  // Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather{
    const city = response.city.name;
    const date = response.list[0].date_txt;
    const temperature = response.list[0].main.temp;
    const description = response.list[0].weather[0].description;
    const icon = response.list[0].weather[0].icon;
    const windSpeed = response.list[0].wind.speed;
    const humidity = response.list[0].main.humidity;
    return new Weather(city, date, icon, description, temperature, windSpeed, humidity);
  }




  /* 
------------------------------------------------------------------------------------------------------------

BUILD FORCAST ARRAY
  - // TODO: Complete buildForecastArray method

------------------------------------------------------------------------------------------------------------ 
*/ 
// Complete buildForecastArray method
private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {

  // Define what is needed from the data
  const forecastArray = [currentWeather];
  const forecastData = weatherData.map(item => {
    const city = currentWeather.city;
    const date = item.date_txt;
    const temperature = item.main.temp;
    const description = item.weather[0].description;
    const icon = item.weather[0].icon;
    const windSpeed = item.wind.speed;
    const humidity = item.main.humidity;

    console.log(city);
    
    // Return a new Weather object to populate the forecastData array
    return new Weather(city, date, icon, description, temperature, windSpeed, humidity);
  });

  return forecastArray.concat(forecastData);
}




  /* 
------------------------------------------------------------------------------------------------------------

GET WEATHER FOR CITY
  // TODO: Complete getWeatherForCity method

------------------------------------------------------------------------------------------------------------ 
*/ 
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    // error handling
    if (!city) {
      throw new Error('City name is required');
    }

    // define what you need
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
    return forecastArray;
  }
}   


export default new WeatherService();