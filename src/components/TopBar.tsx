import {StyleSheet, View, Platform} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackButton from './BackButton';
import ProfileButton from './ProfileButton';
import {TopBarProps} from '../types/type';
import {Text} from 'react-native-paper';
import LogOutButton from './LogOutButton';
import SettingsButton from './SettingsButton';

const TopBar: React.FC<TopBarProps> = ({
  navigation,
  profileStatus,
  backStatus,
}) => {
  const insets = useSafeAreaInsets();
  const goBack = () => {
    navigation.goBack();
  };
  const goProfile = () => {
    navigation.navigate('ProfileScreen');
  };
  const goSettings = () => {
    navigation.navigate('SettingsScreen');
  };
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {backStatus ? (
        <BackButton goBack={goBack} />
      ) : (
        <SettingsButton goSettings={goSettings} />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ChatApp</Text>
      </View>
      {profileStatus ? (
        <ProfileButton goProfile={goProfile} />
      ) : (
        <LogOutButton />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 110 : 56,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
      },
      android: {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
      },
    }),
  },

  titleContainer: {
    flex: 1, // Eklenen stil özelliği
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default TopBar;
