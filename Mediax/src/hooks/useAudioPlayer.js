import { useState, useEffect, useCallback } from 'react';
import { Audio } from 'expo-av';

export default function useAudioPlayer(initialPlaylist = []) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playlist = initialPlaylist;

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadSound = useCallback(async (index = 0) => {
    if (!playlist.length) return;
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: playlist[index].url },
      { shouldPlay: false },
      updateStatus
    );
    setSound(newSound);
    setCurrentIndex(index);
  }, [playlist]);

  const updateStatus = useCallback(status => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
      setIsPlaying(status.isPlaying);
    }
  }, []);

  const play = async () => {
    if (!sound) await loadSound(currentIndex);
    await sound.playAsync();
  };
  const pause = async () => sound && (await sound.pauseAsync());
  const toggle = async () => (isPlaying ? pause() : play());
  const seekTo = async pos => sound && (await sound.setPositionAsync(pos * 1000));
  const next = async () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    await sound?.unloadAsync();
    await loadSound(nextIndex);
    play();
  };
  const previous = async () => {
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    await sound?.unloadAsync();
    await loadSound(prevIndex);
    play();
  };

  return {
    isPlaying,
    position,
    duration,
    play,
    pause,
    toggle,
    seekTo,
    next,
    previous,
    currentTrack: playlist[currentIndex],
  };
}
