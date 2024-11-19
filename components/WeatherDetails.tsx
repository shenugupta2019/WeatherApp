import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, this is a functional component!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'blue',
  },
});

export default WeatherDetails;
