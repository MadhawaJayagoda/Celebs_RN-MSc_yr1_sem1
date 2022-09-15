import React from 'react';
import type {Node} from 'react';
import {useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home/home.screen';
import HighScoreScreen from './src/screens/high-score/high-score.screen';
import CreateProfileScreen from './src/screens/create-profile/create-profile.screen';
import GameScreen from './src/screens/game/game.screen';
import GameOver from './src/screens/game-over/game-over.screen';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="High Score" component={HighScoreScreen} />
        <Stack.Screen
          name="Create Profile"
          component={CreateProfileScreen}
          options={{
            headerTintColor: 'rgb(255,255,255)',
            headerStyle: {
              backgroundColor: '#2D2D2D',
            },
          }}
        />
        <Stack.Screen
          name="Game Screen"
          component={GameScreen}
          options={{
            headerTintColor: 'rgb(255,255,255)',
            headerStyle: {
              backgroundColor: '#2D2D2D',
            },
          }}
        />
        <Stack.Screen
          name="Game Over"
          component={GameOver}
          options={{
            headerTintColor: 'rgb(255,255,255)',
            headerStyle: {
              backgroundColor: '#2D2D2D',
            },
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
