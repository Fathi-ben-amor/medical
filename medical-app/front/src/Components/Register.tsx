/* eslint-disable prettier/prettier */
import React from 'react';
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
function RegisterScreen({navigation}: any) {
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name: string, value: any) => {
    setCredentials({...credentials, [name]: value});
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
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
    } else if (credentials.password !== credentials.confirmPassword) {
      ToastAndroid.showWithGravityAndOffset(
        'Passwords must match',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    await axios
      .post('http://192.168.1.12:3000/users/signup', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.status === 202) {
          navigation.navigate('Login');
        }
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={value => handleChange('confirmPassword', value)}
      />
      <Pressable style={styles.buttonContainer} onPress={handleValidation}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <View style={styles.horizontalLine} />
      <Pressable
        style={styles.buttonContainerSecondary}
        onPress={navigateToLogin}>
        <Text style={styles.buttonTextSecondary}>Login</Text>
      </Pressable>
    </View>
  );
}

export default RegisterScreen;
