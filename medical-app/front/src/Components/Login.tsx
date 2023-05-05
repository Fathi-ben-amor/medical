/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  // Image,
  Text,
  ToastAndroid,
} from 'react-native';
import styles from '../styles/style';
// import medicine from '../../assets/images/medicine.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation}: any) {
  const [credentials, setCredentials] = useState({email: '', password: ''});

  const handleChange = (name: string, value: any) => {
    setCredentials({...credentials, [name]: value});
  };
  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const handleValidation = () => {
    if (
      credentials.email === '' ||
      !credentials.email.match(/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'email must be valid',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (credentials.password.length < 8) {
      ToastAndroid.showWithGravityAndOffset(
        'Password must be at least 8 characters long',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      login();
    }
  };

  const login = async () => {
    await axios
      .post('http://192.168.1.12:3000/users/login', credentials)
      .then(response => {
        if (response.status === 200) {
          navigation.navigate('Schedule');
        }
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('id', response.data.patient);
      })
      .catch(err => {
        ToastAndroid.showWithGravityAndOffset(
          err.response.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  return (
    <View style={styles.container}>
      {/* <Image source={medicine} style={{width: 100, height: 100}} /> */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={value => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={value => handleChange('password', value)}
      />
      <Pressable style={styles.buttonContainer} onPress={handleValidation}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <View style={styles.horizontalLine} />
      <Pressable
        onPress={navigateToRegister}
        style={styles.buttonContainerSecondary}>
        <Text style={styles.buttonTextSecondary}>Register</Text>
      </Pressable>
    </View>
  );
}

export default LoginScreen;
