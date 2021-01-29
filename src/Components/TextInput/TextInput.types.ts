export type TextInputProps = {
  componentID: string;
  value?: string ;
  placeholder?: string;
  label?: string | number | null;
  name?: string;
  containerClassName?: string;
  validate?: boolean;
  regexType?: string;
  customRegex?: string | RegExp;
  errorMessage?: string;
  onChangeCallback?: Function;
  inputAttributes?: object;
  labelAttributes?: object;
  errorMessageAttributes?: object;
  optional?: boolean;
}