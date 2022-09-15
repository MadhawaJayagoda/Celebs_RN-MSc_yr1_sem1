import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import styles from './game.style';
import {Icon, Input, Card, color} from '@rneui/base';
import GameButton from '../../components/game-button/game-button';
import moment from 'moment';
import {celebrities} from './data/celebrity.data';
import ImageCard from '../../components/image-card/image-card';
import AnswerText from '../../components/answer-text/answer-text';

const GameScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  let startTime = moment();
  let endTime;

  const [counter, setCounter] = useState(0);
  const [gameData, setGameData] = useState();
  const [correctAns, setCorrectAns] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fetchData = async () => {
    const celeb_data = await celebrities();
    console.log(celeb_data.data);
    return celeb_data;
  };

  useEffect(() => {
    fetchData().then(res => {
      setGameData(res);
    });
  }, []);

  useEffect(() => {
    console.log('Component re-rendered');
  }, [gameData]);

  const answerBtnAction = (buttonIndex) => {
    console.log('BUTTON ACTION');
    let cur_counter = counter;
    gameData.data.length > ++cur_counter && setCounter(cur_counter++);
    // gameData.data.length > ++cur_counter && setCounter(cur_counter++);
    if (gameData.data?.[counter]?.correctAnsIndex === buttonIndex) {
      console.log("Correct answer obtained");
      let cur_correctAns = correctAns;
      cur_correctAns++;
      setCorrectAns(cur_correctAns);
    }
    if (gameData.data.length === (counter + 1)) {
      endTime = moment();
      var duration = moment.duration(endTime.diff(startTime));
      var seconds = duration.asSeconds();
      navigation.navigate("Game Over", { score: correctAns, totalQuestions: gameData.data.length, timer: seconds});
      return;
    }
  }

  return (
    <SafeAreaView style={[{backgroundStyle}, styles.safeAreaView]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[{backgroundStyle}, {flex: 1}]}>
        <View style={styles.container}>
          {/*<Button*/}
          {/*  title="Fetch data"*/}
          {/*  color="#841584"*/}
          {/*  onPress={() => fetchData()}*/}
          {/*/>*/}
          <View style={styles.headerContainer}>
            <Text style={styles.header}> Who am I ? </Text>
          </View>

          <Button
            title="Fetch data"
            color="#841584"
            onPress={() => {
              // console.log('Data in the state :', gameData.data?.[0]);
              console.log('Data in the state :', gameData.data?.[0].src);
              console.log('Data in the state :', gameData.data.length);
              console.log('Counter :', counter);
              console.log('Number of CorrectAnsw :', correctAns);
              console.log("Current time: ", startTime);
            }}
          />

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
