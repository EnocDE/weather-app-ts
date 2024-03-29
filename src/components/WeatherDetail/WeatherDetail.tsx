import { Weather } from "../../hooks/useWeather";
import { KelvinToCelcius } from "../../utils";
import styles from "./WeatherDetail.module.css";

type WeatherDetailProps = {
  weather: Weather
}

export default function WeatherDetail({weather} : WeatherDetailProps) {
  const iconUrl = weather.weather[0].main
  
	return (
		<div className={`white-blurred-bg ${styles.weather}`}>
        <picture className={styles.weatherImage}>
          <img src={`/icons/${iconUrl}.png`} alt={`${weather.weather[0].main} icon`} />
        </picture>

        <div className={styles.weatherContent}>
          <div>
            <h2 className={styles.city}>{weather.name}</h2>
            <p className={styles.weatherDescription}>{weather.weather[0].description}</p>
          </div>

          <div className={styles.weatherTemperatures}>
            <p className={styles.temperature}>{KelvinToCelcius(weather.main.temp)}&deg;C</p>
          </div>

          <div className={styles.weatherTemperatures}>
            <p>Mínima: <span>{KelvinToCelcius(weather.main.temp_min)}&deg;C</span></p>
            <p>Máxima: <span>{KelvinToCelcius(weather.main.temp_max)}&deg;C</span></p>
          </div>

          <div className={styles.weatherTemperatures}>
            <img className={styles.icons} src="/icons/humidity.png" alt="Humidity icon" />
            <p>Humedad: <span>{weather.main.humidity}%</span></p>
          </div>

        </div>
      </div>
	);
}
