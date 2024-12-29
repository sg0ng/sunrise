'use client'
import Image from "next/image";
import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-clock/dist/Clock.css';

export default function Home() {
  const [value, onChange] = useState('');
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Wake up better with a simulated sunrise. Simply leave your monitor/laptop plugged in at max brightness.
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-sans)]">
          <p>Set alarm time:</p>
          <TimePicker 
            onChange={onChange} 
            value={value} 
            className={'timepicker'} 
            disableClock={true} 
            clearIcon={null}

            />
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Set sunrise alarm now
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/sg0ng/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by sg0ng on GitHub
        </a>
      </footer>
    </div>
  );
}
