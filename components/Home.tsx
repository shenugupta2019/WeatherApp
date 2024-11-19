import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, TextInput, StyleSheet, Text, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import InputComponent from './InputComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';
import uuid from 'react-native-uuid';


const Home = ({ navigation }) => {
  const [data, setData] = useState<WeatherModal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputVal, setInputVal] = useState('');
  const [cityData, setCityData] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, [cityData]);

  // Memoizing the appendData function to avoid re-creating it on every render
  const appendData = useCallback(async (city: string) => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      let updatedData = storedData ? JSON.parse(storedData) : [];
      const newCity = { id: uuid.v4(), name: city };
      updatedData.push(newCity);
      await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
      const uniqueArray = Array.from(new Set(updatedData));
      setCityData(uniqueArray);
    } catch (error) {
      console.error('Error appending data', error);
    }
  }, [cityData]);

  const deleteItem = async (id: string) => {
    try {
      const newItems = cityData.filter(item => item.id !== id);
      await AsyncStorage.setItem('userData', JSON.stringify(newItems));
      setCityData(newItems);
    } catch (error) {
      console.error('Failed to delete item from AsyncStorage', error);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => deleteItem(id) },
    ]);
  };

  const loadData = useCallback(async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData !== null) {
        setCityData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading data', error);
    }
  }, []);

  const debouncedFetchResults = useCallback(debounce((nextValue) => fetchData(nextValue), 500), []);

  const fetchData = async (inputStr: string) => {
    try {
      let apiQuery = `q=${inputStr}`;
      let apiId = "d7b950541d7264a3b3df80a8b6f2cbf7";
      let apiUrlresult = `https://api.openweathermap.org/data/2.5/weather?${apiQuery}&appid=${apiId}`;
      const response = await fetch(apiUrlresult);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json: WeatherModal = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const apiCallButtonPressed = () => {
    appendData(inputVal);
  };

  const handleTextChange = (text: string) => {
    setInputVal(text);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onLongPress={() => handleDelete(item.id)}
        onPress={() => navigation.navigate('Details', { item })}
        style={{
          padding: 15,
          marginBottom: 10,
          backgroundColor: '#f0f0f0',
          borderRadius: 5,
        }}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    ),
    [cityData] // Memoizing to ensure this function is not recreated unless cityData changes
  );

  const memoizedData = useMemo(() => {
    return cityData;
  }, [cityData]);

  return (
    <View style={styles.container}>
      <InputComponent onTextChange={handleTextChange} />
      <Button
        title="Add city"
        onPress={apiCallButtonPressed}
        color="#841584"
      />
      <FlatList
        data={memoizedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  text: {
    color: 'pink',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default Home;
