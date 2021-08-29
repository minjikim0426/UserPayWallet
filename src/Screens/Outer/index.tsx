import React, {useLayoutEffect, useState, useContext} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import {Alert} from 'react-native';
import Styled from 'styled-components/native';

import Input from '~/Components/Input';
import Button from '~/Components/Button';
import IconButton from '~/Components/IconButton';

import {SMSDataContext} from '~/Context/SMSData';
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
  

  const categories = [
    '공공,사회기관',
    '공과금',
    '교육, 육아',
    '교통,운수',
    '레저,스포츠',
    '병원,약국',
    '뷰티',
    '쇼핑',
    '식료품',
    '애완동물',
    '여행,숙박',
    '음식점',
    '카페',
  ];

  return (
    <Container>
      <FormContainer>
        <Title>내용</Title>
        <SelectDropdown  
          data={categories}
          onSelect={(selectedItem, index) =>{
            console.log(selectedItem, index);
            setCategory(selectedItem);
          }}
          defaultButtonText="Category"
          buttonStyle={{marginBottom: 10, width: 330, height:42}}
        />
        <Title>날짜</Title>
        <DatePicker
          mode="date"
          date={date}
          onDateChange={setDate}
          androidVariant="nativeAndroid"
          textColor="white"
        />

        <Title>구매 품목 혹은 가게명</Title>
        <Input
          style={{marginBottom: 10}}
          placeholder=""
          onChangeText={text => setShop(text)}
        />

        <Title>금액</Title>
        <Input
          style={{marginBottom: 10}}
          placeholder="₩"
          onChangeText={text => setMoney(text)}
        />
        <ButtonContainer>
          <Button
            label="확인"
            style={{margin: 10, width:'45%',  backgroundColor:'#4fdfff'}}
            onPress={() => {
              setData(category, date, shop, money);
              Alert.alert('입력이 완료되었습니다.');
              //navigation.navigate('Login');
            }}
          />
          
          <Button
            label="취소"
            style={{margin:10, width:'45%', backgroundColor:'#4fdfff'}}
            onPress={() => {
              navigation.goBack()
            }}
          />
        </ButtonContainer>

        <Description>@Paywallet</Description>
      </FormContainer>

     
    </Container>
  );
};

export default Outer;