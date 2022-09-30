import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './Styles';
import GameButton from '../../components/game-button/game-button';

const HighScore = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {localHS, dbHS} = route.params;
  const [dbHighestScore, setDbHighestScore] = useState();
  const [curHighestRecord, setCurrentHighestRecord] = useState();
  const [finalHighestRecord, setFinalHighestRecord] = useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    getHighestRecord();
  }, []);

  useEffect(() => {
    setHighestRecord();
  }, [curHighestRecord, dbHighestScore]);

  const getHighestRecord = () => {
    if (localHS !== undefined && localHS !== null) {
      setCurrentHighestRecord(JSON.parse(localHS));
    }
    if (dbHS == undefined || dbHS == null) {
      setDbHighestScore({
        correct_ans: 0,
        questions: 0,
        time_taken: 0,
      });
    }
    if (dbHS !== undefined && dbHS !== null) {
      setDbHighestScore(dbHS);
    }
    if (localHS == undefined || localHS == null) {
      setCurrentHighestRecord({
        correct_ans: 0,
        questions: 0,
        time_taken: 0,
      });
    }
  };

  const setHighestRecord = useCallback(() => {
    if (curHighestRecord !== undefined && dbHighestScore !== undefined) {
      if (isLocalRecordGreater(curHighestRecord, dbHighestScore)) {
        setFinalHighestRecord(curHighestRecord);
      } else {
        setFinalHighestRecord(dbHighestScore);
      }
    }
  }, [curHighestRecord, dbHighestScore]);

  const isLocalRecordGreater = (localObj, remoteObj) => {
    if (localObj !== undefined && remoteObj !== undefined) {
      if (localObj.correct_ans > remoteObj.correct_ans) {
        return true;
      } else if (localObj.correct_ans === remoteObj.correct_ans) {
        if (localObj.time_taken < remoteObj.time_taken) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <SafeAreaView style={[{backgroundStyle}, styles.safeAreaView]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[{backgroundStyle}, {flex: 1}]}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../../assets/balck_effect_gameover.jpg')}
            style={styles.image}>
            <View style={styles.imageBgConatiner}>
              <Image
                style={styles.imageBg}
                source={require('../../../assets/highest_score.jpg')}
              />
            </View>
            <View style={styles.cardViewMainContainer}>
              <View style={styles.cardViewContainer}>
                <Text style={styles.textStyle}>
                  {' '}
                  Correct answers:{' '}
                  {typeof finalHighestRecord?.correct_ans !== 'undefined'
                    ? finalHighestRecord.correct_ans
                    : ''}
                </Text>
                <Text style={styles.textStyle}>
                  {' '}
                  Total questions:{' '}
                  {typeof finalHighestRecord?.questions !== 'undefined'
                    ? finalHighestRecord.questions
                    : ''}
                </Text>
                <Text style={styles.textStyle}>
                  {' '}
                  Time taken:{' '}
                  {typeof finalHighestRecord?.time_taken !== 'undefined'
                    ? finalHighestRecord.time_taken
                    : ''}{' '}
                  s
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <GameButton
                onPress={() => navigation.navigate('Home')}
                title={'Go back to Home'}
                iconName="home"
              />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HighScore;
