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
export interface ConversationItemProps {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  image: number;
}
