import {StyleSheet} from 'react-native';
import {Dimensions, PixelRatio} from 'react-native';

const win = Dimensions.get('window');

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
  timer: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffbe1f',
    height: 40,
    width: 200,
  },
  header: {
    fontWeight: '600',
    fontSize: 34,
    fontFamily: 'sans-serif-light',
    color: '#e3e6ee',
    fontStyle: 'italic && Bold',
  },
  headerContainer: {
    alignSelf: 'flex-start',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: 50,
    paddingBottom: 10,
  },
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
