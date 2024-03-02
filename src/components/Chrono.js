import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet,useWindowDimensions } from 'react-native';

const CountUpChronometer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true); // Add state for tracking if the timer is running

  const intervalRef = useRef(null); // Ref for storing the interval ID
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  useEffect(() => {
    if (isRunning) {
      // Start the timer if it's running
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      // Clear the interval if the timer is paused
      clearInterval(intervalRef.current);
    }

    // Clean up the interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleReset = () => {
    setSeconds(0);
  };

  const handlePauseResume = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning); // Toggle the running state
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={[styles.button,{}]} onPress={handleReset}>
          <Text style={[styles.buttonText,{fontSize:windowWidth*0.024}]}>Reset Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePauseResume}>
          <Text style={[styles.buttonText,{fontSize:windowWidth*0.024}]}>{isRunning ? 'Pause' : 'Resume'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'center', // Align children to the center horizontally
  },
  timer: {
    fontSize: 25,
    marginBottom: 0,
    backgroundColor: 'whitesmoke',
  },
  buttonBox: {
    flexDirection: 'row', // Arrange buttons horizontally
  },
  button: {
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    marginTop: 5,
    marginRight: 5,
    padding: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
});

export default CountUpChronometer;
