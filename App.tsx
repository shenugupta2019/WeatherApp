/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './components/DetailScreen';
import FilterPage from './components/FilterPage';
import BookComponent from './components/BookComponent';


function App(): React.JSX.Element {
  const Stack = createStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedValue, setSelectedValue] = useState(null); // Shared state for dropdown


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen name="Book" component={BookComponent} /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="FilterPage">
          {(props) => (
            <FilterPage {...props} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
          )}
        </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
    // <SafeAreaView style={backgroundStyle}>
    //  <Home/>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
