/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Pressable, ToastAndroid, Alert} from 'react-native';
import styles from '../styles/style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeCard = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState({actual: new Date(), string: ''});
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
    await updateTime(
      currentDate.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
  };

  console.log(time);

  const deleteTime = async () => {
    const id = await AsyncStorage.getItem('id');
    await axios
      .delete(`http://192.168.1.12:3000/time/deletetime/${id}/${props.time}`)
      .then(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Time deleted',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      })
      .then(() => {
        props.updateTimes();
      })
      .catch(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Error deleting time',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  const updateTime = async (stringTime: string) => {
    const id = await AsyncStorage.getItem('id');
    console.log(props.time);
    await axios
      .put(`http://192.168.1.12:3000/time/updatetime/${id}/${props.time}`, {
        time: stringTime,
      })
      .then(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Time updated',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      })
      .then(() => {
        props.updateTimes();
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

  const confirmDeleteTime = () => {
    Alert.alert(
      'Delete time ',
      'Are you sure you want to delete this time ?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteTime()},
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.timeCard}>
      <View>
        <Text style={styles.timeText}>{props.time}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <Pressable style={styles.icon}>
          <Icon
            name="pencil-alt"
            size={20}
            color={'#fff'}
            onPress={openTimePicker}
          />
        </Pressable>
        <Pressable style={styles.icon} onPress={confirmDeleteTime}>
          <Icon name="trash" size={20} color={'#fff'} />
        </Pressable>
      </View>
      {open && (
        <DateTimePicker
          mode="time"
          is24Hour={true}
          onChange={onChange}
          value={time.actual}
          display="default"
        />
      )}
    </View>
  );
};

export default TimeCard;
