export type Weather = {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    daily_units: {
        time: string
        temperature_2m_min: string
        temperature_2m_max: string
        apparent_temperature_min: string
        apparent_temperature_max: string
        weathercode: string
        windspeed_10m_max: string
        windgusts_10m_max: string
        precipitation_probability_mean: string
    },
    daily: {
        time: Array<string>
        temperature_2m_min: Array<number>
        temperature_2m_max: Array<number>
        apparent_temperature_min: Array<number>
        apparent_temperature_max: Array<number>
        weathercode: Array<number>
        windspeed_10m_min: Array<number>
        windspeed_10m_max: Array<number>
        windgusts_10m_max: Array<number>
        precipitation_probability_mean: Array<number>
    }
}