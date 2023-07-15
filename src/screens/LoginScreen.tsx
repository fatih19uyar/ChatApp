import React, {useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {LoginScreenProps} from '../types/type';
import LoginScreenForm from '../forms/LoginScreenForm';
import {useDispatch} from 'react-redux';
import {loginFailure, loginSuccess} from '../redux/slice/authReducer';
import {Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const onRegister = () => {
    navigation.navigate('Register');
  };
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const onSubmit = async (values: any) => {
    if (values.email === 'Fatih@gmail.com' && values.password === '12345') {
      // Giriş başarılı
      const user = {
        id: '1',
        username: 'Fatih',
        email: 'Fatih@gamil.com',
      };
      dispatch(loginSuccess(user));
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      // Giriş başarısız, hatalı kullanıcı adı veya şifre
      dispatch(loginFailure('AUTH_LOGIN_FAILED'));
      showSnackbar('Geçersiz kullanıcı adı veya şifre');
    }
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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}>
        {snackbarMessage}
      </Snackbar>
    </Background>
  );
};

export default LoginScreen;
