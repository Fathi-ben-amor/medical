/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('token:', token);
  },

  onNotification: function (notification) {
    console.log('ntf:', notification);
    if (notification.action === 'ReplyInput') {
      console.log('texto', notification.reply_text);
    }
  },

  onAction: function (notification) {
    console.log('act:', notification.action);
    console.log('ntfact:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
