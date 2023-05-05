/* eslint-disable prettier/prettier */
import React from 'react';
import {Pressable, View, ToastAndroid, ScrollView} from 'react-native';
import TimeCard from './TimeCard';
import styles from '../styles/style';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Schedule() {
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState({actual: new Date(), string: ''});
  const [timeCards, setTimeCards] = React.useState([]);
  const updateTimes = async () => {
    await getTime();
  };

  const openTimePicker = () => {
    setOpen(true);
  };

  const onChange = async (event: any, selectedTime: any) => {
    const currentDate = selectedTime || time.actual;
    setOpen(false);
    setTime({
      actual: currentDate,
      string: currentDate.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    await addTime(
      currentDate.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
    await getTime();
  };

  const getTime = async () => {
    const id = await AsyncStorage.getItem('id');
    await axios
      .get(`http://192.168.1.12:3000/time/gettime/${id}`)
      .then(response => {
        setTimeCards(response.data.times.sort());
      })
      .catch(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Error getting time',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  React.useEffect(() => {
    getTime();
  }, []);

  const addTime = async (stringTime: string) => {
    const id = await AsyncStorage.getItem('id');
    await axios
      .post(`http://192.168.1.12:3000/time/addtime/${id}`, {
        time: stringTime,
      })
      .then(() => {
        ToastAndroid.showWithGravityAndOffset(
          'response.data.message',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      })
      .catch(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Error updating time',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  return (
    <View style={styles.scheduleContainer}>
      <ScrollView
        contentContainerStyle={{alignContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        style={styles.ScrollView}>
        {timeCards &&
          timeCards.length > 0 &&
          timeCards.map(timeCard => (
            <TimeCard
              time={timeCard}
              key={timeCard}
              updateTimes={updateTimes}
            />
          ))}
      </ScrollView>
      {open && (
        <DateTimePicker
          mode="time"
          is24Hour={true}
          onChange={onChange}
          value={time.actual}
          display="default"
        />
      )}
      <Pressable
        style={styles.roundedPlusBottomButton}
        onPress={openTimePicker}>
        <Icon name="plus" size={30} color={'#2596be'} />
      </Pressable>
    </View>
  );
}

export default Schedule;
