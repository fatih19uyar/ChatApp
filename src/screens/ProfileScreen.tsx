import {View, Text} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import ProfileScreenForm from '../forms/ProfileScreenForm';
import TopBar from '../components/TopBar';

type Props = {navigation: any};

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  return (
    <Background>
      <TopBar navigation={navigation} profileStatus={false} backStatus={true} />
      <ProfileScreenForm />
    </Background>
  );
};

export default ProfileScreen;
