import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textWrapper: {
    width: 300,
    height: 35,
    backgroundColor: '#eaeae6',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 30,
    shadowColor: '#080605',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.72,
    shadowRadius: 2.22,
    elevation: 5,
  },
  textComponent: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'sans-serif-medium',
  },
});

export default styles;
