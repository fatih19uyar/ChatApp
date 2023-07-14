import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';

const App = () => {
  const userIsLoggedIn = false;

  return (
    <NavigationContainer>
      {userIsLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
