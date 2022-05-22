import React from 'react';
import {
  View
} from 'react-native';
import CenterSpinner from './components/Util/CenterSpinner';
import { logout } from '../authActions';
import { AsyncStorage } from '@react-native-async-storage/async-storage'


const LogoutScreen = () => {

  const _logout = () => {
    AsyncStorage.removeItem('@todo-graphql:session').then(() => {
      logout();
    });
  };

  React.useEffect(_logout, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CenterSpinner />
    </View>
  );
}

LogoutScreen.navigationOptions = {
  drawerLabel: 'Logout',
  title: 'Logging out'
};

export default LogoutScreen;

