export type TextInputProps = {
  label?: string | number | null;
  labelAttributes?: object;
  componentID: string;
  value?: string ;
  placeholder?: string;
  onChangeCallback?: Function;
  inputAttributes?: object;
  validate?: boolean;
  regexType?: string;
  customRegex?: string | RegExp;
  optional?: boolean;
  errorMessage?: string;
  errorMessageAttributes?: object;
  containerClassName?: string;
  name?: string;
}