import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {InputProps} from '../types/type';

const Input: React.FC<InputProps> = ({secret, label, input, meta}) => {
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

  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style={styles.input}
        label={label}
        secureTextEntry={secret && !passwordVisible}
        right={secret && renderIcon()}
        value={input.value}
        onChangeText={input.onChange}
        error={showError}
      />
      {showError && (
        <HelperText style={{color: 'white'}} type="error">
          {meta.error}
        </HelperText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '70%',
    margin: 10,
    marginBottom: 2,
  },
});

export default Input;
