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
  text: string;
  time: string;
  image: number;
}
export type ProfileButtonProps = {
  goProfile: any;
};
export type TopBarProps = {
  navigation: any;
  profileStatus: boolean;
  backStatus: boolean;
  text: string;
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
export interface ProfileScreenProps {
  user: UserProfile;
}

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
  isRead: boolean;
};
export type LastMessageData = {
  text: string;
  time: string;
};
export type UserProfile = {
  username: string;
  createTime: string;
  lastSignTime: string;
  email: string;
};
