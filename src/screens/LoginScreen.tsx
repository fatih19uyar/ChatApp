import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import Input from '../components/Input';
import PressButton from '../components/PressButton';
import Logo from '../components/Logo';

type Props = {};

const LoginScreen = (props: Props) => {
  return (
    <Background>
      <Logo />
      <Input label="Email" secret={false} />
      <Input label="Password" secret={true} />
      <PressButton
        textColor="white"
        onPress={() => console.log('d')}
        text="Forgot Password?"
        mode="TextButton"
      />
      <PressButton
        textColor=""
        onPress={() => console.log('sa')}
        text="LOGIN"
        mode="Button1"
      />
      <PressButton textColor="" text="SIGNUP" mode="Button2" />
    </Background>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
export default LoginScreen;
