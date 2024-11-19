import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const InputComponent = ({ onTextChange }) => {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          onChangeText={onTextChange}  // Calls the parent function on text change
        />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  output: {
    fontSize: 16,
    color: 'gray',
  },
});

export default InputComponent;
