export type TextInputProps = {
  inputID?: string;
  value?: string;
  placeholder?: string;
  label?: string | number | null;
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