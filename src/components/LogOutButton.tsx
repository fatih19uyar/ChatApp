import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/stores';
import {logOut} from '../redux/slice/authReducer';
import auth from '@react-native-firebase/auth';
export default function LogOutButton() {
  const insets = useSafeAreaInsets();
  const dispatch: AppDispatch = useDispatch();

  const logOutFun = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    dispatch(logOut());
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <TouchableOpacity onPress={logOutFun}>
        <Image style={styles.image} source={require('../assets/logout.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
  },
  image: {
    width: 24,
    height: 24,
  },
});
