import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherApiService {
  async getWeather(coordinate: { latitude: number; longitude: number }) {
    const { latitude: lat, longitude: lon } = coordinate;

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`,
      );
      console.log(data);
      return data.weather[0].description;
    } catch (error) {
      console.log(error);
      return 'Ooops';
    }
  }
}
