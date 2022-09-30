import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import GameButton from '../../components/game-button/game-button';
import styles from './Styles';
import {useNetInfo} from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameOver = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {score, totalQuestions, timer} = route.params;
  const netInfo = useNetInfo();
  const [prevHighestScore, setPrevHighestScore] = useState();

  useEffect(() => {
    getRemoteRecordedHighest();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getRemoteRecordedHighest = async () => {
    try {
      const recordedHighScore = await AsyncStorage.getItem('DB_HIGHEST_RECORD');
      const nRecordedHighScore = JSON.parse(recordedHighScore);
      if (nRecordedHighScore !== null && nRecordedHighScore !== undefined) {
        setPrevHighestScore(nRecordedHighScore);
      } else {
        // Playing for the first time - without connection
        setPrevHighestScore({
          correct_ans: score,
          questions: totalQuestions,
          time_taken: timer,
        });
      }
    } catch (err) {
      console.log('Error retrieving data', err);
    }
  };

  // currentScore, timetaken
  const isHighestRecord = () => {
    // Compare current highest and prevHighest in state.
    if (score > prevHighestScore.correct_ans) {
      return true;
    } else if (score == prevHighestScore.correct_ans) {
      if (timer < prevHighestScore.time_taken) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const newGameButtonAction = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        correct_ans: score,
        questions: totalQuestions,
        time_taken: timer,
      }),
    };
    if (netInfo.isConnected) {
      // If there is a network connection, store the high-score in Database
      if (isHighestRecord()) {
        await fetch(
          'http://localhost:3000/scores/632e02eb463182c41e89b2a6',
          requestOptions,
        )
          .then(response => response.json())
          .catch(err => {
            console.log(err);
          });
      }
    } else {
      // if internet connection is not available, store data locally.
      if (isHighestRecord()) {
        await AsyncStorage.setItem(
          'NEW_LOCAL_RECORD',
          requestOptions.body,
          err => {
            if (err) {
              throw err;
            }
          },
        ).catch(err => {
          console.log('Error occured while saving data: ' + err);
        });
      }
    }
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../../assets/balck_effect_gameover.jpg')}
            style={styles.image}>
            <View style={styles.imageBgViewStyle}>
              <Image
                style={styles.imageBgStyle}
                source={require('../../../assets/game_over_edit.jpg')}
              />
            </View>
            <View style={styles.cardViewMainContainer}>
              <View style={styles.cardViewContainer}>
                <Text style={styles.textStyle}>
                  {' '}
                  Your correct answers: {score}{' '}
                </Text>
                <Text style={styles.textStyle}>
                  {' '}
                  Total questions: {totalQuestions}{' '}
                </Text>
                <Text style={styles.textStyle}> Time taken: {timer} s </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <GameButton
                onPress={() => newGameButtonAction()}
                title={'Start a new game'}
                iconName="fire"
              />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameOver;
