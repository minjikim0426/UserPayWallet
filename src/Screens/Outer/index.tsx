import React, {useLayoutEffect, useState, useContext} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import {Alert} from 'react-native';
import Styled from 'styled-components/native';

import Input from '~/Components/Input';
import Button from '~/Components/Button';
import IconButton from '~/Components/IconButton';

import {SMSDataContext} from '~/Context/SMSData';
import {UserContext} from '~/Context/User';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #2c3e50;
`;

const FormContainer = Styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 20px;
`;
const Description = Styled.Text`
  text-align: center;
  font-size: 12px;
  color: #3796EF
  margin: 0px 8px;
`;
const Title = Styled.Text`
  font-size:17px;
  color: #3796EF;
  align-self: flex-start;
  margin-bottom:10px;
`;

const ButtonContainer = Styled.View`
  flex-direction: row;
`;

const Footer = Styled.View`
  width: 100%;
  border-top-width: 1px;
  border-color: #FFFFFF;
  padding: 8px;
`;
const FooterDescription = Styled.Text`
  color: #FFFFFF;
  text-align: center;
`;
const GoBack = Styled.Text`
  color: #3796EF;
`;

type NavigationProp = StackNavigationProp<PayParamList, 'Pay'>;

interface Props {
  navigation: NavigationProp;
}

const Outer = ({navigation}: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          iconName="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      ),
    });
  }, []);

  const [category, setCategory] = useState('');
  const [shop, setShop] = useState('');
  const [money, setMoney] = useState('');
  const [date, setDate] = useState(new Date());

  const {setData} = useContext<ISMSDataContext>(SMSDataContext);
  const {monthlyAcount} = useContext<IUserContext>(UserContext);

  const categories = [
    '??????,????????????',
    '?????????',
    '??????, ??????',
    '??????,??????',
    '??????,?????????',
    '??????,??????',
    '??????',
    '??????',
    '?????????',
    '????????????',
    '??????,??????',
    '?????????',
    '??????',
  ];

  return (
    <Container>
      <FormContainer>
        <Title>??????</Title>
        <SelectDropdown
          data={categories}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setCategory(selectedItem);
          }}
          defaultButtonText="Category"
          buttonStyle={{marginBottom: 10, width: 330, height: 42}}
        />
        <Title>??????</Title>
        <DatePicker
          mode="date"
          date={date}
          onDateChange={setDate}
          androidVariant="nativeAndroid"
          textColor="white"
        />

        <Title>?????? ?????? ?????? ?????????</Title>
        <Input
          style={{marginBottom: 10}}
          placeholder=""
          onChangeText={text => setShop(text)}
        />

        <Title>??????</Title>
        <Input
          style={{marginBottom: 10}}
          placeholder="???"
          onChangeText={text => setMoney(text)}
        />
        <ButtonContainer>
          <Button
            label="??????"
            style={{margin: 10, width: '45%', backgroundColor: '#4fdfff'}}
            onPress={() => {
              setData(category, date, shop, money);
              Alert.alert('????????? ?????????????????????.');
              monthlyAcount();
              //navigation.navigate('Login');
            }}
          />

          <Button
            label="??????"
            style={{margin: 10, width: '45%', backgroundColor: '#4fdfff'}}
            onPress={() => {
              navigation.goBack();
              monthlyAcount();
            }}
          />
        </ButtonContainer>

        <Description>@Paywallet</Description>
      </FormContainer>
    </Container>
  );
};

export default Outer;