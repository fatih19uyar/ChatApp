import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from '../components/Background';
import ProfileScreenForm from '../forms/ProfileScreenForm';
import TopBar from '../components/TopBar';
import {firebase} from '@react-native-firebase/database';
import {getUserById} from '../utils/Firebase';
import {UserProfile} from '../types/type';
import {formatDate} from '../utils/Time';

type Props = {navigation: any};

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchUserProfile = async () => {
    try {
      const currentUser: any = await firebase.auth().currentUser;
      const userName: any = await getUserById(currentUser.uid);
      setUser({
        username: userName,
        createTime: formatDate(currentUser.metadata.creationTime),
        lastSignTime: formatDate(currentUser.metadata.lastSignInTime),
        email: currentUser.email,
      });
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching user profile:', error);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Background>
      <TopBar
        navigation={navigation}
        profileStatus={false}
        backStatus={true}
        text="Profile"
      />
      {user !== null ? (
        <ProfileScreenForm user={user} />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )}
    </Background>
  );
};

export default ProfileScreen;
