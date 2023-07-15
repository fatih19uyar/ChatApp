import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {InputProps} from '../types/type';

const Input: React.FC<InputProps> = ({secret, label, input}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderIcon = () => {
    return (
      <TextInput.Icon
        icon={passwordVisible ? 'eye-off' : 'eye'}
        onPress={togglePasswordVisibility}
      />
    );
  };

  if (secret) {
    return (
      <TextInput
        style={styles.input}
        label={label}
        secureTextEntry={!passwordVisible}
        right={renderIcon()}
        value={input.value}
        onChangeText={input.onChange}
      />
    );
  } else {
    return (
      <TextInput
        style={styles.input}
        label={label}
        value={input.value}
        onChangeText={input.onChange}
      />
    );
  }
};

const styles = StyleSheet.create({
  input: {
    width: '70%',
    margin: 10,
  },
});

export default Input;
