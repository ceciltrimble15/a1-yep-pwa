import { useEffect, useRef, useState } from 'react';
import clips from '../data/foundationClips.json';
import lunchLineMouth from '../data/lunchLineMouth.json';

// The demo uses a generic local narrator. Only the lunch-line clip has timed mouth poses.
export default function useCoachClip(line) {
  const clip = clips[line];
  const current = useRef(null);
  const frame = useRef(0);
  const [active, setActive] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [mouth, setMouth] = useState('closed');
  const [error, setError] = useState('');

  function release() {
    cancelAnimationFrameIfNeeded();
    const audio = current.current;
    current.current = null;
    if (audio) {
      audio.onplaying = audio.onwaiting = audio.onended = audio.onerror = null;
      audio.pause();
    }
  }

  function cancelAnimationFrameIfNeeded() {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
  }

  function stop() {
    release();
    setActive(false);
    setSpeaking(false);
    setMouth('closed');
  }

  useEffect(() => {
    stop();
    setError('');
    const interrupt = () => { if (current.current) stop(); };
    const hide = () => { if (document.hidden) interrupt(); };
    document.addEventListener?.('visibilitychange', hide);
    document.addEventListener?.('yep-stop-narration', interrupt);
    return () => {
      document.removeEventListener?.('visibilitychange', hide);
      document.removeEventListener?.('yep-stop-narration', interrupt);
      release();
    };
  }, [line]);

  function play() {
    if (!clip) return;
    document.dispatchEvent(new Event('yep-stop-narration'));
    window.speechSynthesis?.cancel();
    stop();
    setError('');
    const audio = new Audio('/coach/' + clip + '.mp3');
    current.current = audio;
    setActive(true);
    function failed() {
      if (current.current !== audio) return;
      stop();
      setError('Sound is unavailable. Read the words with your facilitator.');
    }
    function updateMouth() {
      if (current.current !== audio || audio.paused || audio.ended) return;
      let pose = 'closed';
      for (const [start, shape] of lunchLineMouth) {
        if (start > audio.currentTime) break;
        pose = shape;
      }
      setMouth(pose);
      frame.current = requestAnimationFrame(updateMouth);
    }
    audio.onplaying = () => {
      if (current.current !== audio) return;
      setSpeaking(true);
      cancelAnimationFrameIfNeeded();
      if (clip === 'dailyQuest-1' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) updateMouth();
    };
    audio.onwaiting = () => {
      cancelAnimationFrameIfNeeded();
      setSpeaking(false);
      setMouth('closed');
    };
    audio.onended = stop;
    audio.onerror = failed;
    audio.play().catch(failed);
  }

  return { clip, active, speaking, mouth, error, play, stop };
}
