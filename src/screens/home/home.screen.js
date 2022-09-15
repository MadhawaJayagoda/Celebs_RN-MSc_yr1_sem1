import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import GameButton from '../../components/game-button/game-button';
import styles from './home.style';

const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../../assets/home_screen_background.png')}
            style={styles.image}>
            <View style={styles.buttonContainer}>
              <GameButton
                onPress={() => navigation.navigate('Game Screen')}
                title={'Start Game'}
                iconName="gamepad"
              />
              <GameButton
                onPress={() => navigation.navigate('Create Profile')}
                title={'Create Profile'}
                iconName="user"
              />
              <GameButton
                onPress={() => console.log('Game Button pressed')}
                title={'Leaderboard'}
                iconName="fire"
              />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
