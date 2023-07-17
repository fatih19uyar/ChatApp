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
import Header from '../components/Header';
interface IProps extends ConnectedProps<typeof connector> {
  onSubmitSecretKey: (values: any) => void;
  onDeleteUser: () => void;
}
const SettingScreenForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = ({
  handleSubmit,
  onSubmitSecretKey,
  onDeleteUser,
}) => (
  <View style={styles.container}>
    <View style={styles.secretKey}>
      <Field
        name="secretKey"
        component={Input}
        label="Secret Key"
        secret={true}
      />
      <PressButton
        textColor=""
        onPress={handleSubmit(onSubmitSecretKey)}
        text="Save Key"
        mode="Button1"
      />
    </View>
    <PressButton
      onPress={handleSubmit(onDeleteUser)}
      textColor=""
      text="Delete User"
      mode="Button2"
    />
    <Header textColor="white">Created by OFU</Header>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secretKey: {
    width: '60%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const selector = formValueSelector('settingsScreen');
const mapStateToProps = (state: any) => {
  const secretKey = selector(state, 'secretKey');
  return {
    secretKey,
  };
};
const connector = connect(mapStateToProps);
export default connector(
  reduxForm<{}, IProps>({
    form: 'settingScreen',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(SettingScreenForm),
);
