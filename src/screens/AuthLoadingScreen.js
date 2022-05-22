import React from 'react';
import {
  View,
  Alert
} from 'react-native';
import CenterSpinner from './components/Util/CenterSpinner';
import { setLogout } from '../authActions';
import { AsyncStorage } from '@react-native-async-storage/async-storage'

const AuthLoadingScreen = ({ navigation }) => {

  // auth init function
  const _bootstrapAsync = async () => {
    // Fetch token from storage
    const session = await AsyncStorage?.getItem('@todo-graphql:session');
    // If session exists, validate it, else redirect to login screen
    if (session) {
      const sessionObj = JSON.parse(session);
      var currentTime = Math.floor(new Date().getTime() / 1000);
      if (currentTime < sessionObj.exp) {
        Alert.alert('Success!', 'Successfully logged in!')
        navigation.navigate('Main');
        setLogout(() => navigation.navigate('Auth'));
      } else {
        Alert.alert('Error: Session Expired')
        navigation.navigate('Auth');
      }
    } else {
      Alert.alert('Error: No session in Async Storage')
      navigation.navigate('Auth');
    }
  };

  React.useEffect(() => {
    _bootstrapAsync();
  }, []);

  return (
    <View>
      <CenterSpinner />
    </View>
  );
}

export default AuthLoadingScreen;