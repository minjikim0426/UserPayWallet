import React, {Component, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from 'react-native';

import Styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';
import {Calendar} from 'react-native-calendars';
import {UserContext} from '~/Context/User';

import Input from '~/Components/Input';
import Button from '~/Components/Button';

const Container = Styled.View`
  flex: 1;
`;

const SelectContainer = Styled.View`
  flex-direction:row;
  justify-content:center;
`;

const CalendarContainer = Styled.View`
  padding-top: 20px;
`;

const TargetText = Styled.Text`
  font-size: 12px;
  margin-bottom: 5px;
  margin-left:20px;
  color: yellow;

`;

const Information = Styled.Text`
  font-size: 10px;
  margin-left:10px;
  color: white;
`;

const ImageContainer = Styled.View`
  margin-top: 5px;
  margin-left:20px;
  flex-direction: row;
`;

const Calendars = () => {
  const {
    monthlyTarget,
    userInfo,
    result,
    userData,
    target,
  } = useContext<IUserContext>(UserContext);
  const [money, setMoney] = useState();

  //const [markedDate, setMarkedDate] = useState({});
  let markedDate = {};
  let todayDate = new Date().toISOString().slice(0, 10);
  let dateString = String(todayDate);
  let aim = Number(target);
  let acount = Number(result);
  let date = new Date();
  let month = date.getMonth() + 1;
  const boolean = userData.hasOwnProperty(`${month}`);
  console.log(boolean);

  setTimeout(() => {
    //database().ref(`/users/${userInfo}/${month}`).set({over: date});
    //console.log(aim, acount);
    let thirty = aim * 0.3;
    let sixty = aim * 0.6;
    let ninty = aim * 0.9;
    if (aim < acount) {
      if (!userData[month].hasOwnProperty('over')) {
        database()
          .ref(`/users/${userInfo}/${month}`)
          .update({over: dateString});
      }
    }

    if (thirty < acount) {
      if (!userData[month].hasOwnProperty('thirty')) {
        database()
          .ref(`/users/${userInfo}/${month}`)
          .update({thirty: dateString});
      }
    }

    if (sixty < acount) {
      if (!userData[month].hasOwnProperty('sixty')) {
        database()
          .ref(`/users/${userInfo}/${month}`)
          .update({seventy: dateString});
      }
    }
    if (ninty < acount) {
      if (!userData[month].hasOwnProperty('ninety')) {
        database()
          .ref(`/users/${userInfo}/${month}`)
          .update({ninety: dateString});
      }
    }
  }, 3000);

  if (userData[month].hasOwnProperty('thirty')) {
    markedDate[userData[month].thirty] = {
      customStyles: {
        container: {
          borderWidth: 4,
          borderColor: 'rgba(0, 0, 0, 0.473)',
          borderStyle: 'dotted',
          backgroundColor: '#7eff7e',
          justifyContent: 'center',
        },
        text: {
          marginTop: 0,
        },
      },
    };
  }

  if (userData[month].hasOwnProperty('sixty')) {
    markedDate[userData[month].sixty] = {
      customStyles: {
        container: {
          borderWidth: 4,
          borderColor: 'rgba(0, 0, 0, 0.473)',
          borderStyle: 'dashed',
          backgroundColor: '#fff12f',
          justifyContent: 'center',
        },
        text: {
          marginTop: 0,
        },
      },
    };
  }

  if (userData[month].hasOwnProperty('ninety')) {
    markedDate[userData[month].ninety] = {
      customStyles: {
        container: {
          borderWidth: 4,
          borderColor: 'rgba(0, 0, 0, 0.473)',
          backgroundColor: '#fab83c',
          justifyContent: 'center',
        },
        text: {
          marginTop: 0,
        },
      },
    };
  }

  if (userData[month].hasOwnProperty('over')) {
    markedDate[userData[month].over] = {
      selected: true,
      selectedColor: 'red',
    };
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <SelectContainer>
        <Input
          style={{marginBottom: 16, width: 200, height: 40}}
          placeholder="??? ?????? ?????????"
          onChangeText={text => setMoney(text)}
        />
        <Button
          label="??????"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginBottom: 24,
            width: 100,
            height: 40,
            backgroundColor: '#4fdfff',
          }}
          onPress={() => {
            if (boolean) {
              Alert.alert('?????? ?????? ????????? ????????? ?????????????????????.');
            } else {
              monthlyTarget(money);
            }
          }}
        />
      </SelectContainer>
      <TargetText>?????? ??? ?????? ?????????: {aim} ???</TargetText>
      <ImageContainer>
        <Image
          style={{width: 20, height: 20}}
          source={require('~/Assets/Images/Calendar/30.png')}
        />
        <Information>???????????? 30%</Information>
      </ImageContainer>
      <ImageContainer>
        <Image
          style={{width: 20, height: 20}}
          source={require('~/Assets/Images/Calendar/60.png')}
        />
        <Information>???????????? 60%</Information>
      </ImageContainer>
      <ImageContainer>
        <Image
          style={{width: 20, height: 20}}
          source={require('~/Assets/Images/Calendar/90.png')}
        />
        <Information>???????????? 90%</Information>
      </ImageContainer>
      <ImageContainer>
        <Image
          style={{width: 20, height: 20}}
          source={require('~/Assets/Images/Calendar/over.png')}
        />
        <Information>????????? ??????</Information>
      </ImageContainer>
      <CalendarContainer>
        <Calendar markingType={'custom'} markedDates={markedDate} />
      </CalendarContainer>
    </Container>
  );
};

export default Calendars;