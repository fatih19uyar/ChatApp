import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import {RootState, store} from './src/redux/stores';
import {Provider, useDispatch, useSelector} from 'react-redux';

const Stack = () => {
  const userIsLoggedIn: boolean = useSelector<RootState, boolean>(
    state => state.authReducer.isAuthenticated,
  );
  return (
    <NavigationContainer>
      {userIsLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Stack></Stack>
    </Provider>
  );
};

export default App;
