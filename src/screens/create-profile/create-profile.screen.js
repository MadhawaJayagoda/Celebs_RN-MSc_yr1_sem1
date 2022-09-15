import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import styles from './create-profile.style';
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
          console.log(res);
          console.log('IMage URI: ', res.uri);
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
    // console.log('Profile Picture edit button pressed !!');
    launchImageLibrary({mediaType: 'photo'}, res => {
      console.log(res);
      console.log('IMage URI: ', res.assets[0].uri);
      setProfilePhoto(res.assets[0].uri);
    });
  };

  useEffect(() => {
    console.log('Component rerenderd !!', profilePhoto);
  }, [profilePhoto]);

  return (
    <SafeAreaView style={[{backgroundStyle}, styles.safeAreaView]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[{backgroundStyle}, {flex: 1}]}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleProfilePictureEdit()}>
            <View style={styles.profileImageWrapper}>
              {/*{profilePhoto ? (*/}
              {/*  <Image*/}
              {/*    source={{uri: profilePhoto}}*/}
              {/*    style={styles.profileImage}*/}
              {/*  />*/}
              {/*) : (*/}
              {/*  <Image*/}
              {/*    source={require('../../../assets/profile-photo.jpg')}*/}
              {/*    style={styles.profileImage}*/}
              {/*  />*/}
              {/*)}*/}
              <Image
                source={{
                  uri: 'file:///data/user/0/com.celebs/cache/rn_image_picker_lib_temp_bacfc0c9-6fcf-4ead-9e1f-91c88d88b7a0.jpg',
                }}
                style={styles.profileImage}
              />
              <View
                style={{
                  position: 'absolute',
                  justifyContent: 'center',
                  marginLeft: 115,
                  marginTop: 200,
                }}>
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
              inputStyle={{color: 'white'}}
            />
            <Input
              placeholder="Enter your age"
              onChangeText={value => setAge(value)}
              containerStyle={styles.inputTwoContainerStyle}
              inputStyle={{color: 'white'}}
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
