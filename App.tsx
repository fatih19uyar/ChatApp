import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import {AppDispatch, RootState, store} from './src/redux/stores';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginSuccess} from './src/redux/slice/authReducer';
import Toast from 'react-native-toast-message';
import firebase from './firebaseConfig'; // Firebase yapılandırmasını buradan alıyoruz

const Stack = () => {
  const dispatch: AppDispatch = useDispatch();
  const userIsLoggedIn: boolean = useSelector<RootState, boolean>(
    state => state.authReducer.isAuthenticated,
  );

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (!userIsLoggedIn) {
        const loggedInUser = await AsyncStorage.getItem('user');
        if (loggedInUser) {
          const user = JSON.parse(loggedInUser);
          dispatch(loginSuccess(user));
        }
      }
    };

    checkUserLoggedIn();
  }, [dispatch, userIsLoggedIn]);

  return (
    <NavigationContainer>
      {userIsLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Stack />
      <Toast />
    </Provider>
  );
};

export default App;
