import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";
import {v4 as uuidv4} from 'uuid';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 
------------------------------------------------------------------------------------------------------------

CREATE CITY CLASS
  - TODO: Define a City class with name and id properties

------------------------------------------------------------------------------------------------------------ 
*/ 
// Define a City class with name and id properties
class City {
  constructor(public name: string, public id: string) {}
}

/* 
------------------------------------------------------------------------------------------------------------

HISTORY SERVICE CLASS
  - // TODO: Complete the HistoryService class
  - // TODO: Define a read method that reads from the searchHistory.json file


------------------------------------------------------------------------------------------------------------ 
*/ 
// Complete the HistoryService class
class HistoryService {
  private filePath = path.join(__dirname, "../../db/db.json");
  // Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      const cities = JSON.parse(data);
      return cities.map((city: { name: string; id: string}) => new City(city.name, city.id));
    } catch (error) {
      console.error(error);
      return [];
    }
  }


  /* 
------------------------------------------------------------------------------------------------------------

  WRITE
 - // TODO: Define a write method that writes the updated cities array to the searchHistory.json file

------------------------------------------------------------------------------------------------------------ 
*/ 
  // Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.writeFile(this.filePath, data);
    }catch (error) {
      console.error('Error writing file', error);
    }
  }


/* 
------------------------------------------------------------------------------------------------------------

  GET CITIES
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects

------------------------------------------------------------------------------------------------------------ 
*/ 
  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }


/* 
------------------------------------------------------------------------------------------------------------

  ADD CITIES
  // TODO Define an addCity method that adds a city to the searchHistory.json file

------------------------------------------------------------------------------------------------------------ 
*/ 
  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string): Promise<void> {
    const cities = await this.getCities();
    const newCity = new City(city, this.generateId());
    cities.push(newCity);
    await this.write(cities);
  }



  /* 
------------------------------------------------------------------------------------------------------------

  REMOVE CITIES
  // TODO Define an addCity method that adds a city to the searchHistory.json file

------------------------------------------------------------------------------------------------------------ 
*/ 
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);   
  }
  //method to generate a unique id for a city
  private generateId(): string {
    return uuidv4();
  }
}

export default new HistoryService();