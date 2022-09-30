import * as React from 'react';
import {View, Image} from 'react-native';
import styles from './image-card.style';

interface IProps {
  imageUri: string;
}

const ImageCard = ({imageUri}: IProps) => (
  <View style={styles.cardContainer}>
    <Image
      source={{
        uri: imageUri,
        cache: 'force-cache',
      }}
      style={styles.imagePreview}
    />
  </View>
);

export default ImageCard;
