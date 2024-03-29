import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";
import styles from "./Form.module.css";

type FormProps = {
	fetchWeather: (search: SearchType) => Promise<void>;
};

export default function Form({ fetchWeather }: FormProps) {
	const [search, setSearch] = useState<SearchType>({ city: "", country: "" });
	const [alert, setAlert] = useState<string>("");

	function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setSearch({ ...search, [e.target.name]: e.target.value });
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (Object.values(search).includes("")) {
			setAlert("Todos los campos son obligatorios");
			return;
		}
		setAlert("");
    fetchWeather(search);
	}

	return (
		<form className={`white-blurred-bg ${styles.form}`} onSubmit={handleSubmit}>
			{alert && <Alert>{alert}</Alert>}
			<div>
				<input
					type="text"
					id="city"
					name="city"
					placeholder="Ingresa tu ciudad"
					value={search.city}
					onChange={handleChange}
				/>
			</div>

			<div>
				<select
					id="country"
					name="country"
					value={search.country}
					onChange={handleChange}
				>
					<option value="" disabled>
						Selecciona un pais
					</option>
					{countries.map((country) => (
						<option key={country.code} value={country.code}>
							{country.name}
						</option>
					))}
				</select>
			</div>

			<div className={styles.buttonWrapper}>
				<button className={styles.submit} type="submit">
					<img src="/buscar.png" alt="icono buscar" />
				</button>
			</div>
		</form>
	);
}
