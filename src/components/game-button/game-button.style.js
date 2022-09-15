import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#ccccc8',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 36,
    marginVertical: 20,
  },
  appButtonText: {
    fontSize: 18,
    color: '#505050',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  viewContainer: {
    flexDirection: 'row',
  },
  layoutContent: {
    marginHorizontal: 15,
  },
});

export default styles;
