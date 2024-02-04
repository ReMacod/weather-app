"use client";

import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Container from "@/components/Container";
import { useQuery } from "react-query";
import convertelvinToCelsius from "@/utils/convertelvinToCelsius";
import WeatherIcon from "@/components/WeatherIcon";

type WeatherObject = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
};

type WeatherData = {
  dt: number;
  main: MainWeatherInfo;
  weather: WeatherDetails[];
  clouds: CloudsInfo;
  wind: WindInfo;
  visibility: number;
  pop: number;
  sys: SysInfo;
  dt_txt: string;
};

type MainWeatherInfo = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type WeatherDetails = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type CloudsInfo = {
  all: number;
};

type WindInfo = {
  speed: number;
  deg: number;
  gust: number;
};

type SysInfo = {
  pod: string;
};

type CityInfo = {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type Coordinates = {
  lat: number;
  lon: number;
};

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=Ljubljana&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=20`
      );
      return data;
    }
  );

  const firstData = data?.list[0];
  console.log("data", data);

  if (isLoading)
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    );

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div className='flex flex-col gap-4 bg-gray-200 min-h-screen'>
      <Navbar />
      <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
        {/*today data*/}
        <section className='space-y-4'>
          <div className='space-y-2'>
            <h2 className='flex gap-1 text-2xl items-end'>
              <p>({format(parseISO(firstData?.dt_txt ?? ""), "EEEE")})</p>{" "}
              <p className='text-lg'>
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            <Container className='gap-10 px-6 items-center '>
              <div className='flex flex-col px-4'>
                <span className='text-4xl'>
                  {convertelvinToCelsius(firstData?.main.temp ?? 0)}°
                </span>
                <p className='text-xs space-x-1 whitespace-nowrap'>
                  Feels like {convertelvinToCelsius(firstData?.main.temp ?? 0)}°
                </p>
                <p className='text-xs space-x-2'>
                  <span>
                    {convertelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
                  </span>{" "}
                  <span>
                    {convertelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
              {/* time and weather icon */}
              <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'
                  >
                    <p className='whitespace-nowrap'>
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>
                    {/* <WeatherIcon iconName={d.weather[0].icon} /> */}
                    <p>{convertelvinToCelsius(d?.main.temp ?? 0)}°</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>
        {/*7 days forcast data*/}
        <section className=''></section>
      </main>
    </div>
  );
}
