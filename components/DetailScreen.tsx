import { View, TextInput, StyleSheet, Text,Button } from 'react-native';
import WeatherModal from '../Modal/WeatherModal';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const DetailScreen = ({route}) => {
    const [data, setData] = useState<WeatherModal | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log('route params',route)
    const item  = route.params.item;
    console.log('the server data is ',item)

    useEffect(() => {
      fetchData(item.name);
    }, []);

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
  return (
    <View style={styles.container}>
   <Text style={styles.text}>{data?.clouds.all}</Text>
   <Text style={styles.text}>{data?.name}</Text>
   <Text style={styles.text}>{data?.coord.lat}</Text>
   <Text style={styles.text}>{data?.coord.lat}</Text>
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
    text :{
      color: 'pink',
    }
  });

export default DetailScreen;
