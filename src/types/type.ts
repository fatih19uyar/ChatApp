export interface InputProps {
  secret?: boolean;
  label: string;
}
export interface PressButtonProps {
  textColor: string;
  onPress?: () => void;
  mode: string;
  text: string;
}
