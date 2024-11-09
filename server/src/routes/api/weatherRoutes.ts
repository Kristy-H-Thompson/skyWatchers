import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/',  async (req, res) => {
  console.log('Data Request:', req.body);
  const cityName = req.body.cityName;

  if (!cityName || typeof cityName !== 'string' || cityName.trim() === '') {return res.status(400).json({error: 'Invalid city name'});}

  try{
  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(cityName);
  console.log("Weather Data", weatherData);
  // TODO: save city to search history
  await HistoryService.addCity(cityName);
  //return weather data as a response
  return res.json(weatherData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'An error occurred while fetching weather data'});
  }
});

// TODO: GET search history
router.get('/history', async (_, res) => {
  try {
    //retrive search history
    const history = await HistoryService.getCities();
    res.json(history);
    console.log("Fetched History")
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while fetching search history'});
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const cityId = req.params.id; // get city id from request params

  try {
    //delete city from search history
    await HistoryService.removeCity(cityId);
    res.status(204).send();//send no content status
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while deleting city from search history'});
  }
});

export default router;