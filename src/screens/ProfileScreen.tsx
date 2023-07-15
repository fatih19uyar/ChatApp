import {View, Text} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import ProfileScreenForm from '../forms/ProfileScreenForm';

type Props = {};

const ProfileScreen = (props: Props) => {
  return (
    <Background>
      <ProfileScreenForm />
    </Background>
  );
};

export default ProfileScreen;
