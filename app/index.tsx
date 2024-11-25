import { View,  Image, StyleSheet, Text, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors'
import messaging, { getInitialNotification } from '@react-native-firebase/messaging'

export default function Index() {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    if (enabled) {
      console.log('AUTH DO STATUS:', authStatus);
      return true;
    } else {
      console.log('PERMICAO NAO GARANTIDA', authStatus);
      return false;
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      const hasPermission = await requestUserPermission();

      if (hasPermission) {
        messaging()
          .getToken()
          .then((token) => {
            console.log('Token:', token);
          })
          .catch((error) => {
            console.error('Erro ao obter o token:', error);
          });
      }

      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log('notification caused app to open from quit state:', remoteMessage.notification);
          }
        });

      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log('notification caused app to open from background state:', remoteMessage.notification);
      });

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('message handled in the background', remoteMessage);
      });

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        Alert.alert(
          'Nova Notificação da UNICAP!',
          `${remoteMessage.notification?.title || 'Sem título'}\n${remoteMessage.notification?.body || JSON.stringify(remoteMessage.notification)}`
        );
      });

      return unsubscribe;
    };

    checkPermission(); 
  }, []);

  const router = useRouter();

  const handleNavigate = () => {
    router.push("/(tabs)/home");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.Primary,
      }}
    >
      <Image
        source={require('../assets/images/logoScreen.png')}
        style={{
          width: '100%',
          height: 300,
        }}
      />
      <Button mode="contained" onPress={handleNavigate}
      style={{
        backgroundColor: Colors.main.PrimaryColor,
        marginTop: '20%'
      }}
      >
    Press me
  </Button>
    </View>
  );
}

