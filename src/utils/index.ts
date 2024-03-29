export function KelvinToCelcius(temp : number) {
  const kelvin = 273.15;
  return (temp - kelvin).toFixed()
}