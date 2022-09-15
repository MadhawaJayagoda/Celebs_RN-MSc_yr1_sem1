import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text
} from 'react-native';

import {Card} from '@rneui/base';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import GameButton from '../../components/game-button/game-button';
import styles from './game-over.style';

const GameOver = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { score, totalQuestions, timer } = route.params;

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
            source={require('../../../assets/balck_effect_gameover.jpg')}
            style={styles.image}>

            <View style={{marginTop: 120, marginHorizontal: 40}}>
              <Image style={{width: 320, height: 180, resizeMode:"cover"}} source={require('../../../assets/game_over_edit.jpg')} />
            </View>
            <View style={{alignSelf:'center',}}>
              <View style={{ marginTop: 80, height:300, width:300, borderRadius: 10, overflow: 'hidden', borderColor: '#ffc224', borderWidth: 5, paddingLeft: 20, alignItems: 'center', justifyContent: 'center'}} >
                <Text style={{ fontSize: 20, fontFamily: 'sans-serif-medium', color: '#ffc224'}}> Your correct answers: {score} </Text>
                <Text style={{ fontSize: 20, fontFamily: 'sans-serif-medium', color: '#ffc224', marginTop: 12}}> Total questions: {totalQuestions} </Text>
                <Text style={{ fontSize: 20, fontFamily: 'sans-serif-medium', color: '#ffc224', marginTop: 12}}> Time taken: {timer} s </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <GameButton
                onPress={() => navigation.navigate('Home')}
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
