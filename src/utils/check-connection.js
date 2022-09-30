import NetInfo from '@react-native-community/netinfo';

export const checkConnection = () => {
  return NetInfo.fetch().then(con_state => con_state.isConnected);
};
