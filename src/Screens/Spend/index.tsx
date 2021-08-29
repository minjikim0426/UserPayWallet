import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import Styled from 'styled-components/native';
import IconButton from '~/Components/IconButton';


import Calendars from './Calendars';
import List from './List';

const Container = Styled.View`
  flex: 1;
  background-color: #2c3e50;
`;

const OptionContainer = Styled.View`
  flex-direction:row;
  justify-content: flex-end;
  margin-top: 5px;
  padding: 10px;
`;

type NavigationProp = StackNavigationProp<PayParamList, 'Spend'>;

interface Props {
  navigation: NavigationProp;
}

const Spend = ({navigation}: Props) => {
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

  const [option, setOption] = useState<boolean>(true);

  return (
    <Container>
      <OptionContainer>
        <IconButton iconName="list" onPress={() => setOption(true)} />
        <IconButton iconName="calendar" onPress={() => setOption(false)} />
      </OptionContainer>
      {option ? <List /> : <Calendars />}
    </Container>
  );
};

export default Spend;
