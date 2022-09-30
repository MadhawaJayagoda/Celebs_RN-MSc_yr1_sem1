import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import styles from './Styles';
import {Icon, Input} from '@rneui/base';
import GameButton from '../../components/game-button/game-button';
import {launchImageLibrary} from 'react-native-image-picker';

const CreateProfile = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState();
  const [age, setAge] = useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const grantedGallery = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'App Gallery Permission',
          message: 'App needs access to your photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        grantedGallery === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera permission given');
        launchImageLibrary({mediaType: 'mixed'}, res => {
          setProfilePhoto(res.uri);
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleProfilePictureEdit = async () => {
    await requestCameraPermission();
    launchImageLibrary({mediaType: 'photo'}, res => {
      setProfilePhoto(res.assets[0].uri);
    });
  };

  useEffect(() => {}, [profilePhoto]);

  return (
    <SafeAreaView style={[{backgroundStyle}, styles.safeAreaView]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[{backgroundStyle}, {flex: 1}]}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleProfilePictureEdit()}>
            <View style={styles.profileImageWrapper}>
              {profilePhoto ? (
                <Image
                  source={{uri: profilePhoto}}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require('../../../assets/profile-photo.jpg')}
                  style={styles.profileImage}
                />
              )}
              <View style={styles.editImageContainer}>
                <Icon
                  name="pencil"
                  type="font-awesome"
                  color="#2F9E24"
                  size={30}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.textInputContainer}>
            <Input
              placeholder="Enter your gamer name"
              onChangeText={value => setName(value)}
              containerStyle={styles.inputOneContainerStyle}
              inputStyle={styles.inputNameStyle}
            />
            <Input
              placeholder="Enter your age"
              onChangeText={value => setAge(value)}
              containerStyle={styles.inputTwoContainerStyle}
              inputStyle={styles.inputAgeStyle}
            />
          </View>
          <View style={styles.buttonContainer}>
            <GameButton onPress={() => {}} title={'Create Profile'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProfile;
