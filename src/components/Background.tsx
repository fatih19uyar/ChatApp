import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Background = (props: any) => {
  return <View style={styles.container}>{props.children}</View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Background;
