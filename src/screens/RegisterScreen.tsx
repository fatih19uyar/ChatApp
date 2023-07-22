import React, {useState} from 'react';
import Background from '../components/Background';
import {RegisterScreenProps} from '../types/type';
import {useDispatch} from 'react-redux';
import {Snackbar} from 'react-native-paper';
import RegisterScreenForm from '../forms/RegisterScreenForm';
import TopBar from '../components/TopBar';
import auth from '@react-native-firebase/auth';
import {reset} from 'redux-form';

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string, signStatus: boolean) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
    dispatch(reset('registerScreen'));
    signStatus ? (
      setTimeout(() => {
        navigation.navigate('Login');
      }, 500)
    ) : (
      <></>
    );
  };
  const onRegisterMail = async (values: any) => {
    if (values.password !== values.repassword) {
      showSnackbar('Passwords do not match', false);
      return;
    }
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        showSnackbar('User account created & signed in!', true);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          values = null;
          showSnackbar('That email address is already in use!', false);
        }
        if (error.code === 'auth/invalid-email') {
          showSnackbar('That email address is invalid!', false);
        }
        showSnackbar('The given password is invalid.', false);
      });
  };
  function handleGoogleButtonPress() {
    showSnackbar('Comming Soon..', false);
  }

  return (
    <Background>
      <TopBar navigation={navigation} profileStatus={false} backStatus={true} />
      <RegisterScreenForm
        onRegister={onRegisterMail}
        onGoogleSign={handleGoogleButtonPress}
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

export default RegisterScreen;
