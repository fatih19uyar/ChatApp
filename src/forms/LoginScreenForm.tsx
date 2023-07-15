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
interface IProps extends ConnectedProps<typeof connector> {
  onSubmit: (values: any) => void;
  onRegister: (values: any) => void;
  onForgotPassword: () => void;
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

const LoginScreenForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = ({
  handleSubmit,
  onSubmit,
  onRegister,
  onForgotPassword,
}) => (
  <>
    <Field name="email" component={Input} label="Email" secret={false} />
    <Field name="password" component={Input} label="Password" secret={true} />
    <PressButton
      textColor=""
      onPress={handleSubmit(onSubmit)}
      text="LOGIN"
      mode="Button1"
    />
    <PressButton
      onPress={handleSubmit(onRegister)}
      textColor=""
      text="SIGNUP"
      mode="Button2"
    />
    <PressButton
      textColor="white"
      onPress={handleSubmit(onForgotPassword)}
      text="Forgot Password?"
      mode="TextButton"
    />
  </>
);

const selector = formValueSelector('loginScreen');
const mapStateToProps = (state: any) => {
  const email = selector(state, 'email');
  const password = selector(state, 'password');
  return {
    email,
    password,
  };
};
const connector = connect(mapStateToProps);
export default connector(
  reduxForm<{}, IProps>({
    form: 'loginScreen',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
  })(LoginScreenForm),
);
