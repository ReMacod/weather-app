import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import { WeatherDetailProps } from "./WeatherDetails";

type Props = {};

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    weatherIcon = "02d",
    date = "19.09",
    day = "Monday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;

  return (
    <Container className=''>
      <section className='flex gap-4 items-center px-4'>
        <div>
          <WeatherIcon iconName={weatherIcon} />
          <p className=''>{date}</p>
          <p></p>
        </div>
      </section>
    </Container>
  );
}
