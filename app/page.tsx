'use client'

import useSound from 'use-sound';
import React, { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-clock/dist/Clock.css';
import Head from 'next/head'

export default function Home() {
  const [time, setTime] = useState('00:00');
  const [backgroundColor, setBackgroundColor] = useState("#222230");
  const [play, { stop }] = useSound('/birds.mp3', {loop: true, interrupt: true});
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  
  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      setIsAlarmSet(true);
    }
  }
  
  useEffect(() => {
    const element = document.getElementById("button");
    const isFullscreen = document.fullscreenElement;
    const toggleFullscreen = () => {
      if (isFullscreen) {
        document.exitFullscreen();
      } else {
        element?.requestFullscreen();
      }
    }
    return() => toggleFullscreen();
  }, []);

  useEffect(() => {
    if (!isAlarmSet) return;

    const interval = setInterval(() => {
      const now = new Date();
      const alarm = new Date();
      const [hours, minutes] = time.split(':');
      
      alarm.setHours(parseInt(hours, 10));
      alarm.setMinutes(parseInt(minutes, 10));

      const startSunriseTime = new Date(alarm.getTime() - 30 * 60000);
      
      if (now.getHours() === alarm.getHours() && now.getMinutes() === alarm.getMinutes() && !hasPlayed) {
        setIsTime(true);
        setHasPlayed(true);
        play();
      }

      if (now >= startSunriseTime && now <= alarm) {
        const progress = (now.getTime() - startSunriseTime.getTime()) / (30 * 60000);
        const r = Math.floor(34 + (191 * progress));
        const g = Math.floor(34 + (176 * progress));
        const b = Math.floor(48 + (85 * progress));
        setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
      }
    }, 1000);

      
    return () => clearInterval(interval);
  }, [time, play, isAlarmSet, hasPlayed]);

  if (isAlarmSet) {
    if (isTime) { // if alarm going off
      return (
        <div 
        style={{ 
          backgroundColor,
          transition: 'background-color 3s ease',
          minHeight: '100vh'
        }}
        className="grid place-items-center"
      >
        <Head>
      <title>Sunrise Alarm - Wake Up!</title>
    </Head>
        <div className="text-center">
          <button
            className="rounded-full border border-solid border-[#746a5b] dark:border-[#8f8980] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => [setIsAlarmSet(false), setIsTime(false), setHasPlayed(false), stop(), setBackgroundColor("0, 0, 0")]}
          >
            Stop alarm
          </button>
        </div>
      </div>
      );
    }

    return ( // if not time to wake up
      <div 
        style={{ 
          backgroundColor,
          transition: 'background-color 3s ease',
          minHeight: '100vh'
        }}
        className="grid place-items-center"
      >
        <Head>
        <title>Sunrise Alarm</title>
      </Head>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-12 pb-20 gap-16 sm:p-24 font-[family-name:var(--font-geist-sans)]">
          <h1 className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-sans)]"
          >
            Waking up at: {time}
          </h1>
          <button
            className="rounded-full border border-solid border-[#746a5b] dark:border-[#8f8980] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => [setIsAlarmSet(false), setBackgroundColor("0, 0, 0")]}
          >
            Cancel alarm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
    <Head>
      <title>Sunrise Alarm</title>
    </Head>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Wake up better with a simulated sunrise. Simply leave your monitor/laptop plugged in at max brightness and volume.
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-sans)]">
          <p>Set alarm time:</p>
          <TimePicker 
            onChange={(value) => setTime(value as string)} 
            value={time} 
            className={'timepicker'} 
            disableClock={true} 
            clearIcon={null}
            onKeyDown={handleKeyDown}
            />
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
        <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => [setIsAlarmSet(true), setBackgroundColor("0, 0, 0"), toggleFullscreen()]}
          >
            Set sunrise alarm now
          </button>
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
