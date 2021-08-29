import React, {createContext, useState, useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const defaultContext: IUserDataContext = {
  info: undefined,
  category: undefined,
  month: undefined,
  ListData: (select_month: string) => {},
  getMonthSum: (select_category: string) => {},
  getCategorySum: (select_month: string) => {},
  getPercentage: (select_category: string) => {},
};

const UserDataContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const UserDataContextProvider = ({children}: Props) => {
  //const {userInfo} = useContext<IUserContext>(UserContext);
  const [category, setCategory] = useState([]);
  const [month, setMonth] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [info, setInfo] = useState([]);
  const [percentage, setPercentage] = useState([]);

  
  //List
  const ListData = async (select_month: string) => {
    var user_data = [];
    let user = auth().currentUser;
    var DataRef = database().ref(`user_wallet/${user.uid}`);
  
    var list_data = [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],[0,0,0],
    [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],[0,0,0]];

    var count = 0;
    try {
      DataRef.on('value', snapshot => {
        snapshot.forEach(child => {
          var modified_money = child.val().money.slice(0, -1).replace(',', '');

          user_data.unshift({
            key: child.key,
            category: child.val().category,
            money: modified_money,
            shop: child.val().shop,
          });
        });
        for (var i = 0; i < user_data.length; i++) {
          var Date = user_data[i].key.slice(1);
          var newDate = moment(Date * 1000).format('MM/DD/YYYY hh:MM');
          var month = newDate.slice(0, 2);
  
          if (month == select_month) {
            list_data[count][0] = user_data[i].shop;
            list_data[count][1] = user_data[i].category;
            list_data[count][2] = user_data[i].money;
            count++;
          } 
        }
        setInfo(list_data);
      });
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  // LineChart
  const getMonthSum = async (select_category: string) => {
    var user_data = [];
    let user = auth().currentUser;

    if (user) {
      var DataRef = database().ref(`user_wallet/${user.uid}`);
      var month_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      try {
        DataRef.on('value', snapshot => {
          snapshot.forEach(child => {
            var modified_money = child
              .val()
              .money.slice(0, -1)
              .replace(',', '');
          
            user_data.unshift({
              key: child.key,
              category: child.val().category,
              money: modified_money,
            });
          });

          for (var i = 0; i < user_data.length; i++) {
            if (select_category == user_data[i].category) {
              var Date = user_data[i].key.slice(1);
              var newDate = moment(Date * 1000).format('MM/DD/YYYY hh:MM');
              var month = newDate.slice(0, 2);

              if (month == '01') { month_sum[0] += Number(user_data[i].money);}
              if (month == '02') { month_sum[1] += Number(user_data[i].money);}
              if (month == '03') { month_sum[2] += Number(user_data[i].money);}
              if (month == '04') { month_sum[3] += Number(user_data[i].money);}
              if (month == '05') { month_sum[4] += Number(user_data[i].money);}
              if (month == '06') { month_sum[5] += Number(user_data[i].money);}
              if (month == '07') { month_sum[6] += Number(user_data[i].money);}
              if (month == '08') { month_sum[7] += Number(user_data[i].money);}
              if (month == '09') { month_sum[8] += Number(user_data[i].money);}
              if (month == '10') { month_sum[9] += Number(user_data[i].money); }
              if (month == '11') { month_sum[10] += Number(user_data[i].money);}
              if (month == '12') { month_sum[11] += Number(user_data[i].money);}
            }
          }
          setCategory(month_sum);
          //console.log('확인!!!');
          //console.log('현재 선택된 category : '+select_category);
          //console.log(month_sum);
        });
      } catch (e) {
        console.log(e);
        Alert.alert(e);
      }
    }
  };

  // BarChart
  const getCategorySum = async (select_month: string) => {
    var user_data = [];
    const classified_list = [
      '공공,사회기관',
      '공과금',
      '교육,육아',
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

    let user = auth().currentUser;
    var DataRef = database().ref(`user_wallet/${user.uid}`);

    try {
      DataRef.on('value', snapshot => {
        snapshot.forEach(child => {
          var modified_money = child.val().money.slice(0, -1).replace(',', '');

          user_data.unshift({
            key: child.key,
            category: child.val().category,
            money: modified_money,
          });
        });

        var category_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (var i = 0; i < user_data.length; i++) {
          for (var j = 0; j < classified_list.length; j++) {
            var Date = user_data[i].key.slice(1);
            var newDate = moment(Date * 1000).format('MM/DD/YYYY hh:MM');
            var month = newDate.slice(0, 2);

            if (select_month == month) {
              if (user_data[i].category == classified_list[j]) {
                category_sum[j] += Number(user_data[i].money);
              }
            }
          }
        }
        setMonth(category_sum);
        //console.log('현재 선택된 month : '+select_month);
        //console.log(category_sum);
      });
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  //PieChart
  const getPercentage = async (select_month: string) => {
    const user_data = [];
    const classified_amount = [0,0,0,0,0,0,0,0,0,0,0,0,0]; // category 별 금액/전체
    var classified_amount_sum = 0;
    const classified_list = ["공공,사회기관", "공과금", "교육,육아", "교통,운수", "레저,스포츠", "병원,약국", "뷰티", "쇼핑", "식료품", "애완동물", "여행,숙박", "음식점", "카페"];
  
    let user = auth().currentUser;
    var DataRef = database().ref(`user_wallet/${user.uid}`);

    try {
      DataRef.on('value', snapshot => {
        snapshot.forEach(child => {
          var modified_money = child.val().money.slice(0, -1).replace(',', '');

          user_data.unshift({
            key: child.key,
            category: child.val().category,
            money: modified_money,
          });
        });

        var category_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (var i = 0; i < user_data.length; i++){
          for (var j = 0; j < classified_list.length; j++){
            var Date = user_data[i].key.slice(1);
            var newDate = moment(Date * 1000).format('MM/DD/YYYY hh:MM');
            var month = newDate.slice(0, 2);
            if (select_month == month) {
              if (user_data[i].category == classified_list[j]){
                category_sum[j] += Number(user_data[i].money);
              }
            }
          }
        }
        
        for (var i = 0; i<classified_amount.length; i++){
          classified_amount_sum += category_sum[i];
        }
  
        for (var i = 0; i<classified_amount.length; i++){
          classified_amount[i] = Number((category_sum[i] / classified_amount_sum * 100).toFixed(2));
        }
        
        setPercentage(classified_amount);
        //console.log('현재 선택된 month : '+select_month);
        //console.log(category_sum);
        //console.log(classified_amount);
      });
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };


  useEffect(() => {
    ListData('09');
    getMonthSum('카페');
    getCategorySum('09');
    getPercentage('09');
  }, []);

  return (
    <UserDataContext.Provider
      value={
        {
          info,
          category,
          month,
          percentage,
          ListData,
          getMonthSum,
          getCategorySum,
          getPercentage,
        } 
      }>
      {children}
    </UserDataContext.Provider>
  );
};
export {UserDataContextProvider, UserDataContext};