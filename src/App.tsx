import styles from "./App.module.css";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";

function App() {
	const { weather, fetchWeather, hasWeatherData, loading, notFound } = useWeather();

	return (
		<>
			<main className={styles.bg}>
				<h1 className={styles.title}>Buscador de clima</h1>

				<Form fetchWeather={fetchWeather} />
				{hasWeatherData && <WeatherDetail weather={weather} />}
        {loading && <Spinner />}
        {notFound && <div className={`${styles.notFound} white-blurred-bg`}><p>Ciudad no encontrada</p></div>}
			</main>
		</>
	);
}

export default App;
