import { useCallback, useEffect, useRef, useState } from 'react';
import christmasRoom from './assets/audio/01-christmas-room.mp3';
import lettersRoom from './assets/audio/02-letters.mp3';
import memoriesRoom from './assets/audio/03-memories.mp3';
import littleStars from './assets/audio/04-little-stars.mp3';
import treasureRoom from './assets/audio/05-treasure-room.mp3';

const TRACKS = [christmasRoom, lettersRoom, memoriesRoom, littleStars, treasureRoom];
const STORAGE_KEY = 'pixels-green-treasure-music';

function initialEnabled() {
  try { return localStorage.getItem(STORAGE_KEY) !== 'off'; }
  catch { return true; }
}

export function useRoomMusic({ chapter, active, paused }) {
  const audioRef = useRef(null);
  const trackRef = useRef(null);
  const attemptRef = useRef(0);
  const [enabled, setEnabled] = useState(initialEnabled);
  const [blocked, setBlocked] = useState(false);

  const stop = useCallback(() => {
    attemptRef.current += 1;
    audioRef.current?.pause();
  }, []);

  const play = useCallback((nextChapter) => {
    const src = TRACKS[nextChapter];
    if (!src) return;
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.preload = 'auto';
    }
    const audio = audioRef.current;
    if (trackRef.current !== src) {
      audio.src = src;
      trackRef.current = src;
    }
    const attempt = ++attemptRef.current;
    audio.play().then(() => {
      if (attempt === attemptRef.current) setBlocked(false);
    }).catch(() => {
      if (attempt === attemptRef.current) setBlocked(true);
    });
  }, []);

  // Called directly from the start/resume button, within the user gesture.
  function start(nextChapter) {
    if (enabled) play(nextChapter);
  }

  function toggle() {
    // A denied autoplay attempt can be retried with an explicit tap.
    const next = !enabled || blocked;
    setEnabled(next);
    setBlocked(false);
    try { localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off'); } catch { /* optional preference */ }
    if (next && active && !paused) play(chapter);
    else stop();
  }

  useEffect(() => {
    if (enabled && active && !paused) play(chapter);
    else stop();
  }, [chapter, active, paused, enabled, play, stop]);

  useEffect(() => () => {
    stop();
    if (audioRef.current) {
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
      audioRef.current = null;
    }
    trackRef.current = null;
  }, [stop]);

  return { enabled, blocked, start, toggle };
}
