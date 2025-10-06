import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import useAudioPlayer from '../hooks/useAudioPlayer';
import PlayerControls from '../components/PlayerControls';
import formatTime from '../utils/formatTime';

const { width } = Dimensions.get('window');
const playlist = [
  {
    title: 'Sample Track 1',
    artist: 'Artist One',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    artwork: 'https://picsum.photos/400/400',
  },
  {
    title: 'Sample Track 2',
    artist: 'Artist Two',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    artwork: 'https://picsum.photos/401/401',
  },
];

export default function HomeScreen() {
  const { isPlaying, position, duration, toggle, next, previous, seekTo, currentTrack } = useAudioPlayer(playlist);

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <View style={styles.artworkWrapper}>
        <Image source={{ uri: currentTrack?.artwork }} style={styles.artwork} />
      </View>
      <Text style={styles.title}>{currentTrack?.title}</Text>
      <Text style={styles.artist}>{currentTrack?.artist}</Text>

      <Slider
        style={{ width: width - 40, height: 40 }}
        minimumValue={0}
        maximumValue={duration || 0}
        value={position}
        onSlidingComplete={seekTo}
        minimumTrackTintColor="#ef4444"
        maximumTrackTintColor="#ffffff50"
        thumbTintColor="#fff"
      />
      <View style={styles.timeRow}>
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>

      <PlayerControls isPlaying={isPlaying} onToggle={toggle} onNext={next} onPrev={previous} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  artworkWrapper: { width: width - 80, height: width - 80, borderRadius: 16, overflow: 'hidden' },
  artwork: { width: '100%', height: '100%' },
  title: { color: '#fff', fontSize: 22, marginTop: 16, fontWeight: '700' },
  artist: { color: '#94a3b8', fontSize: 14, marginBottom: 20 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', width: width - 40 },
  time: { color: '#94a3b8', fontSize: 12 },
});
