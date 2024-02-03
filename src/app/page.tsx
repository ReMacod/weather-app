"use client";

import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useQuery } from "react-query";

// https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f3d0bfd7be1baf785ae351ad677a4d77

//   https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID={process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=30

interface WeatherDetail {}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?id=f3d0bfd7be1baf785ae351ad677a4d77&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );
      return data;
    }

    // fetch(
    //   "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f3d0bfd7be1baf785ae351ad677a4d77&cnt=30"
    // ).then((res) => res.json())
  );

  // const firstData = data?.list[0];
  // console.log("data", data?.city.country);

  if (isLoading)
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-4 bg-gray-200 min-h-screen'>
      <Navbar />
      <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
        {/*today data*/}
        <section>
          <div>
            <h2 className='flex gap-1 text-2xl items-end'>
              {/* <p>({format(parseISO(firstData?.dt_txt ?? ""), "EEEE")})</p>{" "}
              // <p className='text-lg'>
              //   ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
              // </p> */}
            </h2>
            <div></div>
          </div>
        </section>
        {/*7 days forcast data*/}
        <section></section>
      </main>
    </div>
  );
}
