import React, {useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {LoginScreenProps} from '../types/type';
import LoginScreenForm from '../forms/LoginScreenForm';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../redux/slice/authReducer';
import {Snackbar} from 'react-native-paper';
import {reset} from 'redux-form';
import auth from '@react-native-firebase/auth';

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const onRegister = () => {
    dispatch(reset('loginScreen'));
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
    await auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(userCredential => {
        const {user} = userCredential;
        const uid: any = user.uid;
        const email: any = user.email;
        setTimeout(() => {
          dispatch(loginSuccess({id: uid, email: email}));
          dispatch(reset('loginScreen'));
        }, 500);
        showSnackbar('Login Success...');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password')
          showSnackbar('Wrong Password.');
        else if (error.code === 'auth/user-not-found') {
          showSnackbar('User no found.');
        } else {
          showSnackbar('System error...');
        }
      });
  };

  const onForgotPassword = () => {
    showSnackbar('Comming Soon...');
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
