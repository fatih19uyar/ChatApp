import {WrappedFieldProps} from 'redux-form';

export interface InputProps extends WrappedFieldProps {
  label: string;
  secret?: boolean;
}
export interface PressButtonProps {
  textColor: string;
  onPress?: () => void;
  mode: string;
  text: string;
}
export interface LoginScreenProps {
  navigation: any;
}
export interface RegisterScreenProps {
  navigation: any;
}
export interface ConversationItemProps {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  image: number;
}
export type ProfileButtonProps = {
  goProfile: any;
};
export type TopBarProps = {
  navigation: any;
  profileStatus: boolean;
  backStatus: boolean;
};
export interface MessageItemProps {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  image: number;
}
export type SettingsItemProps = {
  id: string;
  title: string;
  onPress: () => void;
};

export type SettingsScreenFormProps = {
  background: string;
  onBackgroundChange: (imageUri: string) => void;
};
export type Message = {
  id: string;
  sender: string;
  recipientUserID: string;
  text: string;
  time: string;
};
