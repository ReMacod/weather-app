"use client";

import React, { useState, useRef, useEffect } from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "@/app/atom";

type Props = { location: string };

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  //
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [place, setPlace] = useAtom(placeAtom);
  const [, setloadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        setError("");
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&APPID=${API_KEY}`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        console.log("suggestions", suggestions);
        console.log("response", response.data.list);
        setSuggestions(suggestions);
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setloadingCity(true);
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found.");
      setloadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setloadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  return (
    <nav className='shadoow-sm sticky top-0 left-0 z-50 bg-violet-300 '>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <p className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-900 text-xl'>Weather</h2>
          <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
        </p>
        <section className='flex gap-2 items-center'>
          <MdMyLocation className='text-2xl text-gray-600 hover:opacity-80 cursor-pointer' />
          <MdOutlineLocationOn className='text-3xl' />
          <p className='text-slate-900/80 text-sm'>{location}</p>
          <div className='relative'>
            <SearchBox
              value={city}
              onSubmit={handleSubmitSearch}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <SuggestionBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error && suggestions.length < 1) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [error, suggestions]);
  console.log("error", error);
  return (
    <>
      {((showSuggestions && suggestions.length > 0) || show) && (
        <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
          {show && <li className='text-red-500 p-1'>{error}</li>}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className='cursor-pointer p-1 rounded hover:bg-gray-200'
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
