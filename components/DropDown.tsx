import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Dropdown = ({ selectedValue, onValueChange }) => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(value) => onValueChange(value)}
        style={styles.picker}
      >
        {options.map((option) => (
          <Picker.Item label={option.label} value={option.value} key={option.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 200,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default Dropdown;
