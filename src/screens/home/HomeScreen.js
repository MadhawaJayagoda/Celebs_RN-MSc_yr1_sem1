import React, {useEffect, useCallback, useState, useRef} from 'react';
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
import styles from './Styles';
import {useNetInfo} from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const netInfo = useNetInfo();
  const [recordedLocalHighest, setRecordedLocalHighest] = useState();
  const [remoteHighest, setRemoteHighest] = useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    getLocalRecordedHighest();
    if (netInfo.isConnected) {
      // When there is connection available.
      getRemoteHighestRecord();
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    syncData();
  }, [syncData, netInfo.isConnected]);

  const syncData = useCallback(async () => {
    try {
      // Compare whether local highest score is greater than remote
      // If local is greater send the data to update remote DB
      if (
        recordedLocalHighest !== null &&
        recordedLocalHighest !== undefined &&
        remoteHighest !== null &&
        remoteHighest !== undefined
      ) {
        if (
          isLocalRecordGreater(JSON.parse(recordedLocalHighest), remoteHighest)
        ) {
          updateHighestRecord();
        }
      }
    } catch (err) {
      console.log('Error in sync data: ', err);
    }
  }, [recordedLocalHighest, remoteHighest]);

  const isLocalRecordGreater = (localObj, remoteObj) => {
    if (localObj.correct_ans > remoteObj.correct_ans) {
      return true;
    } else if (localObj.correct_ans === remoteObj.correct_ans) {
      if (localObj.time_taken < remoteObj.time_taken) {
        return true;
      }
    }
    return false;
  };

  let locallyRecordedHighestScoreAsync = useRef();
  const getLocalRecordedHighest = useCallback(async () => {
    try {
      locallyRecordedHighestScoreAsync.current = await AsyncStorage.getItem(
        'NEW_LOCAL_RECORD',
      );
      if (
        locallyRecordedHighestScoreAsync.current !== null &&
        locallyRecordedHighestScoreAsync.current !== undefined
      ) {
        setRecordedLocalHighest(locallyRecordedHighestScoreAsync.current);
      } else {
        setRecordedLocalHighest({correct_ans: 0, questions: 0, time_taken: 0});
      }
    } catch (err) {
      console.log('Error retrieving data: ', err);
    }
  }, [locallyRecordedHighestScoreAsync.current]);

  let remData = useRef();
  const getRemoteHighestRecord = useCallback(async () => {
    await fetch('http://localhost:3000/scores/')
      .then(response => response.json())
      .then(data => {
        remData.current = data[0];
        setRemoteHighest(data[0]);
        return data[0];
      })
      .then(res => {
        setRemoteHighestRecord(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [remData.current]);

  const setRemoteHighestRecord = async remoteHighest => {
    await AsyncStorage.setItem(
      'DB_HIGHEST_RECORD',
      JSON.stringify(remoteHighest),
      err => {
        if (err) {
          throw err;
        }
      },
    ).catch(err => {
      console.log('Error occured while saving data: ' + err);
    });
  };

  const updateHighestRecord = useCallback(() => {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: recordedLocalHighest,
    };
    fetch(
      'http://localhost:3000/scores/632e02eb463182c41e89b2a6',
      requestOptions,
    )
      .then(response => response.json())
      .catch(err => {
        console.log(err);
      });
  }, [recordedLocalHighest]);

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
                onPress={() =>
                  navigation.navigate('Leaderboard', {
                    localHS: recordedLocalHighest,
                    dbHS: remoteHighest,
                  })
                }
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
