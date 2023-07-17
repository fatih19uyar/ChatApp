import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type SettingsButtonProps = {
  goSettings: any;
};

export default function SettingsButton({goSettings}: SettingsButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <TouchableOpacity onPress={goSettings}>
        <Image
          style={styles.image}
          source={require('../assets/settings.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  image: {
    width: 24,
    height: 24,
  },
});
