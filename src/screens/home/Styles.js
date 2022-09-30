import {StyleSheet} from 'react-native';
import {Dimensions, PixelRatio} from 'react-native';

const win = Dimensions.get('window');
const background_img_ratio = win.width / 1080;
const background_img_height = 2275;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: background_img_height * background_img_ratio,
    width: win.width,
  },
  buttonContainer: {
    position: 'absolute',
    top: win.height * 0.6,
    left: win.width / 6,
  },
});

export default styles;
