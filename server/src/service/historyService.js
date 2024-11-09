import { promises as fs } from 'fs';
// TODO: Define a City class with name and id properties
class City {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}
// TODO: Complete the HistoryService class
class HistoryService {
    // TODO: Define a read method that reads from the searchHistory.json file
    // private async read() {}
    async read() {
        try {
            const data = await fs.readFile('searchHistory.json', 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error reading the file:', error);
            return [];
        }
    }
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    // private async write(cities: City[]) {}
    async write(cities) {
        try {
            await fs.writeFile('searchHistory.json', JSON.stringify(cities, null, 2));
        }
        catch (error) {
            console.error('Error writing to the file:', error);
        }
    }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    // async getCities() {}
    async getCities() {
        const citiesData = await this.read();
        return citiesData.map((cityData) => new City(cityData.name, cityData.id));
    }
    // TODO Define an addCity method that adds a city to the searchHistory.json file
    // async addCity(city: string) {}
    async addCity(cityName) {
        const cities = await this.getCities();
        const newCity = new City(cityName, Date.now().toString()); // Use timestamp as unique id
        cities.push(newCity);
        await this.write(cities);
    }
    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    // async removeCity(id: string) {}
    async removeCity(id) {
        let cities = await this.getCities();
        cities = cities.filter(city => city.id !== id);
        await this.write(cities);
    }
}
export default new HistoryService(); // Export the instance of HistoryService as the default export
