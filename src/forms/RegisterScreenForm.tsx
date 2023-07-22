import * as React from 'react';
import {
  Field,
  InjectedFormProps,
  formValueSelector,
  reduxForm,
} from 'redux-form';
import {ConnectedProps, connect} from 'react-redux';
import PressButton from '../components/PressButton';
import Input from '../components/Input';
import {StyleSheet, View} from 'react-native';
interface IProps extends ConnectedProps<typeof connector> {
  onRegister: (values: any) => void;
  onGoogleSign: () => void;
}

const validate = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email format';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

const isValidEmail = (email: string) => {
  // Email format validation logic here
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const RegisterScreenForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = ({
  handleSubmit,
  onRegister,
  onGoogleSign,
}) => (
  <View style={styles.container}>
    <Field name="email" component={Input} label="Email" secret={false} />
    <Field name="password" component={Input} label="Password" secret={true} />
    <Field
      name="repassword"
      component={Input}
      label="Re-enter Password"
      secret={true}
    />
    <PressButton
      onPress={handleSubmit(onRegister)}
      textColor=""
      text="SIGNUP"
      mode="Button2"
    />
    <PressButton
      onPress={onGoogleSign}
      textColor=""
      text="GOOGLE SIGNUP"
      mode="Button1"
    />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const selector = formValueSelector('registerScreen');
const mapStateToProps = (state: any) => {
  const email = selector(state, 'email');
  const password = selector(state, 'password');
  const rePassword = selector(state, 'repassword');
  return {
    email,
    password,
    rePassword,
  };
};
const connector = connect(mapStateToProps);
export default connector(
  reduxForm<{}, IProps>({
    form: 'registerScreen',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
  })(RegisterScreenForm),
);
