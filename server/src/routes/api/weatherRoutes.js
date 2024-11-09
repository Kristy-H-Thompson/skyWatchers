import { Router } from 'express';
const router = Router();
// Importing service modules (ensure paths are correct)
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    const { city } = req.body;
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }
    try {
        // Get weather data from city name
        const weatherData = await WeatherService.getWeatherForCity(city);
        // TODO: save city to search history
        await HistoryService.addCity(city);
        return res.status(200).json(weatherData);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
});
// TODO: GET search history
router.get('/history', async (_, res) => {
    try {
        const history = await HistoryService.read();
        return res.status(200).json(history);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve search history' });
    }
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await HistoryService.removeCity(id);
        return res.status(204).send(); // No content to send back
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to delete city from history' });
    }
});
export default router;
