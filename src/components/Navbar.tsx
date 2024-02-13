"use client";

import React, { useState } from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";

type Props = {};

export default function Navbar({}: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  //
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=Ljubljana&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=40`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
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

  return (
    <nav className='shadoow-sm sticky top-0 left-0 z-50 bg-white'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <p className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-500 text-xl'>Weather</h2>
          <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
        </p>
        <section className='flex gap-2 items-center'>
          <MdMyLocation className='text-2xl text-gray-600 hover:opacity-80 cursor-pointer' />
          <MdOutlineLocationOn className='text-3xl' />
          <p className='text-slate-900/80 text-sm'></p>
          <div className='relative'>
            {" "}
            <SearchBox
              value={city}
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={undefined}
            />
            <SuggestionBox
              showSuggestions={false}
              suggestions={[]}
              handleSuggestionClick={function (item: string): void {
                throw new Error("Function not implemented.");
              }}
              error={""}
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
  return (
    <ul className='mb-4 bg-white absoulte border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
      <li className='cursor-pointer p-1 rounded hover:bg-gray-200'></li>
    </ul>
  );
}
