import { View,  Image, StyleSheet, Text, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors'
import messaging, { getInitialNotification } from '@react-native-firebase/messaging'
import auth from '@react-native-firebase/auth';
import { FirebaseError } from 'firebase/app';

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

  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const signUp = async () => {
		setLoading(true);
		try {
			await auth().createUserWithEmailAndPassword(email, password);
			alert('Check your emails!');
		} catch (e: any) {
			const err = e as FirebaseError;
			alert('Registration failed: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

	const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      router.push("/(tabs)/home");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Sign in failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/images/adaptive-icon.png')} />
			<KeyboardAvoidingView behavior="padding" style={styles.keyB}>
				<TextInput
					style={styles.input}
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
					placeholder="Email"
				/>
				<TextInput
					style={styles.input}
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					placeholder="Password"
				/>
				{loading ? (
					<ActivityIndicator size={'small'} style={{ margin: 28 }} />
				) : (
					<>
						<Button style={styles.btn_login} labelStyle={{ color: '#fff' }} accessibilityLabel="Botão de Login" onPress={signIn} >ACESSAR</Button>
						<Button onPress={signUp} accessibilityLabel="Botão de Criar Conta" >Criar Conta</Button>
					</>
				)}
			</KeyboardAvoidingView>
		</View>
  );
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop:'50%',
		justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f0d9',
    gap: 40

	},
  keyB:{
    height: '100%',
    width: '100%',
  },
  img: {
    height: 200,
    width: 200,
  },
	input: {
		marginVertical: 4,
		height: 50,
    maxHeight: 50,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff',
    textAlign: 'left',
    
	},
  btn_login: {
    padding: 10,
    maxHeight: 50,
    backgroundColor: '#8c1a1a',
    marginVertical: 10,
    borderRadius: 4
  }
});