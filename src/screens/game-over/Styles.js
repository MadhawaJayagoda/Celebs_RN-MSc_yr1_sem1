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
    bottom: win.height * 0.06,
    alignSelf: 'center',
  },
  imageBgViewStyle: {
    marginTop: 120,
    marginHorizontal: 40,
  },
  imageBgStyle: {
    width: 320,
    height: 180,
    resizeMode: 'cover',
  },
  cardViewMainContainer: {
    alignSelf: 'center',
  },
  cardViewContainer: {
    marginTop: 80,
    height: 300,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ffc224',
    borderWidth: 5,
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
    color: '#ffc224',
  },
});

export default styles;
