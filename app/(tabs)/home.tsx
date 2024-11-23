import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import HeaderLogo from '../../components/headerLogo';

type RootStackParamList = {
  profile: any;
  event: any;
  exStudent: any;
  denunciation: any;
  settings: any;
  notification: any;
};

const goToEventPage = () => {
  Linking.openURL('https://eventos.unicap.br/eventos/');
};

const goToPortalPage = () => {
  Linking.openURL('https://portal2.unicap.br/RM/web/app/edu/PortalEducacional/login/');
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const iconSize = 40;
  const iconColor = Colors.main.PrimaryColor;

  return (
    <View style={styles.container}>
      <HeaderLogo />

      <View style={styles.grid}>

        <Pressable style={styles.button} onPress={() => navigation.navigate('profile')}>
          <FontAwesome name="user" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Perfil</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={goToEventPage}>
          <MaterialIcons name="event-note" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Eventos</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.navigate('exStudent')}>
          <FontAwesome5 name="user-graduate" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Ex Alunos</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.navigate('denunciation')}>
          <MaterialIcons name="error-outline" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Denuncias</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={goToPortalPage}>
          <MaterialIcons name="school" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Portal do Aluno</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.navigate('notification')}>
          <MaterialIcons name="notifications" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Notificações</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f0d9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  logo: {
    marginBottom: 30,
    marginTop: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    paddingTop: 30,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    pointerEvents: 'auto',
  },
  buttonText: {
    fontSize: 16,
    color: '#8c1a1a',
    fontWeight: 'bold',
    marginTop: 5,
    verticalAlign: 'middle',
    textAlign: 'center'
  },
});
