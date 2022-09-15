import * as React from 'react';
import {View, Button, TouchableOpacity, Text} from 'react-native';
import styles from './answer-text.style';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
  onPress: () => void;
  index: number;
  actorName: string;
}

const AnswerText = ({onPress, index, actorName}: IProps) => (
  <TouchableOpacity
    onPress={() => {
      console.log(`Button ${index} pressed`);
      onPress();
    }}>
    <View style={styles.textWrapper}>
      <Text style={styles.textComponent}>{actorName} </Text>
    </View>
  </TouchableOpacity>
);

export default AnswerText;
