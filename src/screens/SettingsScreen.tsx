import {Alert} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import TopBar from '../components/TopBar';
import SettingsScreenForm from '../forms/SettingsScreenForm';
import {useDispatch} from 'react-redux';
import {addKey} from '../redux/slice/keyReducer';
import {logOut} from '../redux/slice/authReducer';

type Props = {navigation: any};
const SettingsScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const handleDeleteAccount = () => {
    Alert.alert(
      'Hesabı Sil',
      'Hesabınızı silmek istediğinizden emin misiniz?',
      [
        {text: 'Vazgeç', style: 'cancel'},
        {text: 'Evet, Sil', style: 'destructive', onPress: deleteAccount},
      ],
    );
  };
  const deleteAccount = () => {
    dispatch(logOut());
  };
  const onSubmitSecretKey = (values: any) => {
    dispatch(addKey(values));
  };

  return (
    <Background>
      <TopBar navigation={navigation} profileStatus={false} backStatus={true} />
      <SettingsScreenForm
        onSubmitSecretKey={onSubmitSecretKey}
        onDeleteUser={handleDeleteAccount}
      />
    </Background>
  );
};

export default SettingsScreen;
