import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {ProfileButtonProps} from '../types/type';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function ProfileButton({goProfile}: ProfileButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <TouchableOpacity onPress={goProfile}>
        <Image style={styles.image} source={require('../assets/profile.png')} />
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
