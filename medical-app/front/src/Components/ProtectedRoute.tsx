/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleProtectedRoute = async ({navigation}: any) => {
  const token = await AsyncStorage.getItem('token');
  !token && navigation.navigate('Login');
};

export {handleProtectedRoute};
