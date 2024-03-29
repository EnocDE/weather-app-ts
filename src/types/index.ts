export type SearchType = {
	city: string;
	country: string;
};

export type Country = {
	code: string;
	name: string;
};

export type Weather = {
	name: string;
	main: {
		humidity: number;
		temp: number;
		temp_max: number;
		temp_min: number;
	};
	weather: WeatherInfo[];
};

type WeatherInfo = {
	description: "clear sky";
	icon: "01d";
	id: 800;
	main: "Clear";
};

