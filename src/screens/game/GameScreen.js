import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import styles from './Styles';
import moment from 'moment';
import ImageCard from '../../components/image-card/image-card';
import AnswerText from '../../components/answer-text/answer-text';

const GameScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  let startTime = moment();
  let endTime;
  let celeb_data;

  const [counter, setCounter] = useState(0);
  const [gameData, setGameData] = useState();
  const [correctAns, setCorrectAns] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fetchData = async () => {
    await fetch('http://localhost:3000/celebs')
      .then(data => data.json())
      .then(data => (celeb_data = data))
      .catch(err => console.log(err));
    return celeb_data;
  };

  useEffect(() => {
    fetchData().then(res => {
      setGameData(res);
    });
  }, []);

  useEffect(() => {}, [gameData]);

  const answerBtnAction = buttonIndex => {
    let cur_counter = counter;
    gameData.data.length > ++cur_counter && setCounter(cur_counter++);
    if (gameData.data?.[counter]?.correctAnsIndex === buttonIndex) {
      let cur_correctAns = correctAns;
      cur_correctAns++;
      setCorrectAns(cur_correctAns);
    }
    if (gameData.data.length === counter + 1) {
      endTime = moment();
      var duration = moment.duration(endTime.diff(startTime));
      var seconds = duration.asSeconds();
      navigation.navigate('Game Over', {
        score: correctAns,
        totalQuestions: gameData.data.length,
        timer: seconds,
      });
      return;
    }
  };

  return (
    <SafeAreaView style={[{backgroundStyle}, styles.safeAreaView]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[{backgroundStyle}, {flex: 1}]}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}> Who am I ? </Text>
          </View>
          <ImageCard imageUri={gameData ? gameData.data?.[counter].src : ''} />
          <View style={styles.textContainer}>
            {gameData
              ? gameData.data?.[counter].answers?.map((ans, index) => (
                  <AnswerText
                    key={index}
                    onPress={() => answerBtnAction(index)}
                    index={index}
                    actorName={ans}
                  />
                ))
              : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameScreen;
