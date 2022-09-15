import * as React from 'react';
import {View, Button, TouchableOpacity, Text} from 'react-native';
import styles from './game-button.style';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
  onPress: () => void;
  title: string;
  iconName?: string;
}

const GameButton = ({onPress, title, iconName}: IProps) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <View style={styles.viewContainer}>
      {iconName ? <Icon name={iconName} size={32} color="#900" /> : null}
      <Text style={[styles.appButtonText, styles.layoutContent]}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default GameButton;
