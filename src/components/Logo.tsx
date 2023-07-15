import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const Logo = (props: Props) => {
  return <Text style={styles.logo}>ChatApp</Text>;
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
    marginBottom: 40,
  },
});
