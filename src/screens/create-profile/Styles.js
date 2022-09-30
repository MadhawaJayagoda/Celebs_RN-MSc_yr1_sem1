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
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageWrapper: {
    width: 230,
    height: 230,
    marginTop: 100,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 115,
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
    flexDirection: 'column',
    marginTop: 80,
  },
  inputOneContainerStyle: {
    paddingLeft: 10,
    width: 280,
    height: 80,
  },
  inputTwoContainerStyle: {
    paddingLeft: 10,
    width: 280,
    height: 80,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  editImageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    marginLeft: 115,
    marginTop: 200,
  },
  inputNameStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  inputAgeStyle: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default styles;
