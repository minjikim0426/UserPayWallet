import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  width: 100%;
  height: 50px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  background-color: #FAFAFA;
  border-width: 1px;
  border-color: #D3D3D3;
`;
const InputField = Styled.TextInput`
  flex: 1;
  color: #292929;
`;

interface Props {
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  style?: Object;
  clearMode?: boolean;
  value?: string;
  ref?: Object;
  onChangeText?: (text: string) => void;
}

const Input = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
  clearMode,
  value,
  ref,
  onChangeText,
}: Props) => {
  return (
    <Container style={style}>
      <InputField
        selectionColor="#292929"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        placeholderTextColor="#C3C2C8"
        placeholder={placeholder}
        clearButtonMode={clearMode ? 'while-editing' : 'never'}
        onChangeText={onChangeText}
        value={value}
        ref={ref}
      />
    </Container>
  );
};

export default Input;
