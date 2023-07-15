import React from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {LoginScreenProps} from '../types/type';
import LoginScreenForm from '../forms/LoginScreenForm';

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const onRegister = () => {
    navigation.navigate('Register');
  };
  const onSubmit = (values: any) => {
    console.log(values);
  };
  const onForgotPassword = () => {
    console.log('forgot');
  };

  return (
    <Background>
      <Logo />
      <LoginScreenForm
        onSubmit={onSubmit}
        onRegister={onRegister}
        onForgotPassword={onForgotPassword}
      />
    </Background>
  );
};
export default LoginScreen;
