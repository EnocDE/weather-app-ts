import axios from "axios";
// import {z} from "zod"
import { useMemo, useState } from "react";
import { Output, array, number, object, parse, string } from "valibot";
import { SearchType } from "../types";

// TypeGuards
// function isWeatherResponse(weatherRes : unknown) : weatherRes is Weather {
//   return (
//     Boolean(weatherRes) &&
//     typeof weatherRes === 'object' &&
//     typeof (weatherRes as Weather).name === 'string' &&
//     typeof (weatherRes as Weather).main.humidity === 'number' &&
//     typeof (weatherRes as Weather).main.temp === 'number' &&
//     typeof (weatherRes as Weather).main.temp_max === 'number' &&
//     typeof (weatherRes as Weather).main.temp_min === 'number'
//   )
// }

// Zod
// const WeatherInfo = z.object({
//   description: z.string(),
// 	icon: z.string(),
// 	id: z.number(),
// 	main: z.string(),
// })

// (schema: forma que va a tener el type)
// const Weather = z.object({
// 	name: z.string(),
// 	main: z.object({
// 		humidity: z.number(),
// 		temp: z.number(),
// 		temp_max: z.number(),
// 		temp_min: z.number(),

// 	}),
//   weather: z.array(WeatherInfo)
// });

// type Weather = z.infer<typeof Weather>

// Valibot
const WeatherInfo = object({
	description: string(),
	icon: string(),
	id: number(),
	main: string(),
});

const WeatherSchema = object({
	name: string(),
	main: object({
		humidity: number(),
		temp: number(),
		temp_max: number(),
		temp_min: number(),
	}),
	weather: array(WeatherInfo),
});

export type Weather = Output<typeof WeatherSchema>;

const initialState = {
	main: {
		humidity: 0,
		temp: 0,
		temp_max: 0,
		temp_min: 0,
	},
	name: "",
	weather: [
		{
			description: "",
			icon: "",
			id: 0,
			main: "",
		},
	],
};

export default function useWeather() {
	const [weather, setWeather] = useState<Weather>(initialState);
	const [loading, setLoading] = useState(false);
	const [notFound, setNotFound] = useState(false);

	async function fetchWeather(search: SearchType) {
		const { city, country } = search;
		const appId = import.meta.env.VITE_API_KEY;

		setWeather(initialState);
		setLoading(true);
		setNotFound(false);

		try {
			const GeocodingUrlAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${appId}`;

			const GeocodingData = await axios(GeocodingUrlAPI);
			const { data } = GeocodingData;

			if (!data[0]) {
				setNotFound(true);
				return;
			}

			const { lat, lon } = data[0];

			const WeatherUrlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

			// Castear el type
			// const WeatherData = await axios<Weather>(WeatherUrlAPI)

			//Zod
			// const result = Weather.safeParse(WeatherData)

			// if (result.success) {
			//   console.log(result.data);
			// } else {
			//   console.log('Respuesta mal formada');
			// }

			const { data: WeatherData } = await axios(WeatherUrlAPI);

			// Valibot (schema, json)
			const result = parse(WeatherSchema, WeatherData);

			if (result) {
				setWeather(result);
			} else {
				console.log("respuesta mal");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	const hasWeatherData = useMemo(() => weather.name, [weather]);

	return {
		weather,
		fetchWeather,
		hasWeatherData,
		loading,
		notFound,
	};
}
