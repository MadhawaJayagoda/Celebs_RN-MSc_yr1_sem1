import {StyleSheet} from 'react-native';
import {Dimensions, PixelRatio} from 'react-native';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 40,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default styles;
