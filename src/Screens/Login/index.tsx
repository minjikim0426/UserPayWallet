import React, {useContext, useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import {UserContext} from '~/Context/User';

import Input from '~/Components/Input';
import Button from '~/Components/Button';
import { Alert } from 'react-native';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #2c3e50;
`;
const FormContainer = Styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const Logo = Styled.Text`
  color: #FFFFEF;
  font-size: 40px;
  font-style: italic;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const PasswordReset = Styled.Text`
  width: 100%;
  color: #3796EF;
  text-align: right;
  margin-bottom: 24px;
`;

const SignupText = Styled.Text`
  color: #929292;
  text-align: center;
`;
const SignupLink = Styled.Text`
  color: #3796EF;
`;

const Footer = Styled.View`
  width: 100%;
  border-top-width: 1px;
  border-color: #D3D3D3;
  padding: 8px;
`;
const Copyright = Styled.Text`
  color: #929292;
  text-align: center;
`;

type NavigationProp = StackNavigationProp<LoginNaviParamList, 'Login'>;
interface Props {
  navigation: NavigationProp;
}

const Login = ({navigation}: Props) => {
  const {login} = useContext<IUserContext>(UserContext);

  const [email, setUserId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Container>
      <FormContainer>
        <Logo>Pay Wallet</Logo>
        <Input style={{marginBottom: 16}} placeholder="이메일"
        onChangeText={text => setUserId(text)}
        />
        <Input
          style={{marginBottom: 16}}
          placeholder="비밀번호"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <PasswordReset onPress={() => navigation.navigate('PasswordReset')}>
          비밀번호 재설정
        </PasswordReset>
        <Button
          label="로그인"
          style={{marginBottom: 24, backgroundColor:'#4fdfff'}}
          onPress={() => {
            login(email, password);
          }}
        />
        <SignupText>
          계정이 없으신가요?{' '}
          <SignupLink onPress={() => navigation.navigate('Signup')}>
            가입하기.
          </SignupLink>
        </SignupText>
      </FormContainer>
      <Footer>
        <Copyright>Pay Wallet from @corone-hi</Copyright>
      </Footer>
    </Container>
  );
};

export default Login;
