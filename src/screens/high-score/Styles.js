import {StyleSheet} from 'react-native';
import {Dimensions, PixelRatio} from 'react-native';

const win = Dimensions.get('window');
const background_img_ratio = win.width / 1080;
const background_img_height = 2275;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#42403f',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  imageBgConatiner: {
    marginTop: 120,
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  imageBg: {
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
    paddingLeft: 5,
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
