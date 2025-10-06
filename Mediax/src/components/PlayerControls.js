import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PlayerControls({ isPlaying, onPlay, onPause, onNext, onPrev, onToggle }) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity onPress={onPrev}><Text style={styles.icon}>⏮</Text></TouchableOpacity>
      <TouchableOpacity onPress={onToggle} style={styles.playButton}>
        <Text style={styles.playText}>{isPlaying ? '⏸' : '▶'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}><Text style={styles.icon}>⏭</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: { flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginVertical: 20 },
  icon: { fontSize: 28, color: '#fff' },
  playButton: { backgroundColor: '#ef4444', borderRadius: 40, padding: 18 },
  playText: { fontSize: 22, color: '#fff' },
});
