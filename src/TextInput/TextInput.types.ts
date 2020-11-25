export type TextInputProps = {
  inputID?: string;
  value?: string | number;
  placeholder?: string;
  label?: string;
  containerClassName?: string;
  validate?: boolean;
  regexType?: string;
  customRegex?: string | RegExp;
  errorMessage?: string;
  onChangeCallback?: Function;
  inputAttributes?: object;
  labelAttributes?: object;
  errorMessageAttributes?: object;
}