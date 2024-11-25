import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import HeaderLogo from '@/components/headerLogo';
import Colors from '../../constants/Colors';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';

type NotificationType = {
  title: string;
  body: string;
};

export default function Event() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]); 
  const isFocused = useIsFocused();


  const addNotification = (notification: NotificationType) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  useEffect(() => {

    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log('Notificação recebida em primeiro plano:', remoteMessage.notification);

      const newNotification = {
        title: remoteMessage.notification?.title || 'Sem título',
        body: remoteMessage.notification?.body || 'Sem corpo',
      };
      

      addNotification(newNotification);


      await Notifications.scheduleNotificationAsync({
        content: {
          title: newNotification.title,
          body: newNotification.body,
        },
        trigger: null, 
      });
    });


    messaging()
      .onNotificationOpenedApp((remoteMessage) => {
        console.log('Notificação aberta:', remoteMessage.notification);
        const newNotification = {
          title: remoteMessage.notification?.title || 'Sem título',
          body: remoteMessage.notification?.body || 'Sem corpo',
        };
        addNotification(newNotification);
      });


    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notificação inicial:', remoteMessage.notification);
          const newNotification = {
            title: remoteMessage.notification?.title || 'Sem título',
            body: remoteMessage.notification?.body || 'Sem corpo',
          };
          addNotification(newNotification);
        }
      });

    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {

    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationBody}>{item.body}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noNotifications}>Nenhuma notificação recebida.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.Trr,
    alignItems: 'center',
  },
  notificationItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.light.Primary,
    width: '90%',
    borderRadius: 10,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.dark.Text,
  },
  notificationBody: {
    fontSize: 14,
    color: Colors.dark.Text,
  },
  noNotifications: {
    fontSize: 16,
    color: Colors.dark.Text,
    textAlign: 'center',
    marginTop: 20,
  },
});
