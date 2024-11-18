# Sky Watchers
![License](https://img.shields.io/badge/License-MIT-yellow.svg "License")

## Description
Sky Watchers is a web application that you can use to view the current weather and five day forecast of any city that you would like to search. For your convenience, Sky Watchers also saves your previous searches on the left hand side of your screen. You can delete these saved searches at any time.

- What was your motivation?
I created this project because I travel a lot, and it is nice to have one place to easily access the weather in different places. I love that the weather updates automatically!

- What did I learn?
Creating this project I learned to connect to an external API, use API keys, and load data onto my own webpage. 

## Features
- City search
- Saves your city search history
- Loads today's weather
- Loads a 5 day forecast for that city
- Delete save city search history

## Technologies
- HTML
- Node.js
- Type Script
- Vite
- Open Weather API


## Link to deployed website
[link](https://skywatchers.onrender.com)

## Table of Contents (Optional)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [UserStories](#userStories)


## Installation
No extra installations are needed to use this web application. Simply access it via your web browser.
If you would like to edit the code, you can fork this repo. You must downloaded all the project dependencies including node.js, typescript, and vite. You will also have to get access to your own Open Weather API key to set up an .env file.


## Usage
To get started with Sky Watchers simply open the web application and search a city by name 


## Credits
### Contributors
- [Kristy Thompson](https://github.com/Kristy-H-Thompson)

### Reasources used

- Node.js: [Link](https://nodejs.org/en/download/package-manager)
- Typescript: [LINK](https://www.typescriptlang.org/download/)
- Profesional readMe Guide: [Link](https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide)
- Open Weather API: [Link](https://openweathermap.org/api)
- Vite documentation: [Link](https://vite.dev/)

## License
MIT License

## User Stories
- AS A traveler
- I WANT to see the weather outlook for multiple cities
- SO THAT I can plan a trip accordingly

## Acceptance Criteria
GIVEN a weather dashboard with form inputs
- WHEN I search for a city
- THEN I am presented with current and future conditions for that city, and that city is added to the search history
- WHEN I view current weather conditions for that city
- THEN I am presented with the city name, the date, an icon representation of weather conditions, a description of the weather for the icon's `alt` tag, the temperature, the humidity, and the wind speed
- WHEN I view future weather conditions for that city
- THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
- WHEN I click on a city in the search history
- THEN I am again presented with current and future conditions for that city
