import React from 'react';
import type {Node} from 'react';
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

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home/home.screen';
import HighScoreScreen from './src/screens/high-score/high-score.screen';
import CreateProfileScreen from './src/screens/create-profile/create-profile.screen';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="High Score">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="High Score" component={HighScoreScreen} />
        <Stack.Screen name="Create Profile" component={CreateProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
