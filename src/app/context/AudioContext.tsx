import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import bgMusic from "../../../quietphase-instrumental-relax-496352.mp3";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  togglePlay: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const fadeAudio = (targetVolume: number, duration: number, callback?: () => void) => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const audio = audioRef.current;
    const startVolume = audio.volume;
    const volumeDifference = targetVolume - startVolume;

    if (volumeDifference === 0) {
      if (callback) callback();
      return;
    }

    const stepTime = 50;
    const totalSteps = duration / stepTime;
    const volumeStep = volumeDifference / totalSteps;
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      currentStep++;
      const newVolume = startVolume + volumeStep * currentStep;

      audio.volume = Math.max(0, Math.min(1, newVolume));

      if (currentStep >= totalSteps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        audio.volume = targetVolume;
        if (callback) callback();
      }
    }, stepTime);
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(bgMusic);
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      setIsPlaying(false);
      fadeAudio(0, 600, () => {
        audio.pause();
      });
    } else {
      setIsPlaying(true);
      if (audio.paused) {
        audio.play().catch((err) => {
          console.error("Audio playback failed:", err);
        });
      }
      fadeAudio(1, 600);
    }
  };

  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
