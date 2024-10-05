import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import HeaderLogo from '../../components/headerLogo'

type RootStackParamList = {
  profile: any;
  event: any;
  exStudent: any;
  denunciation: any;
  settings: any;
};

const goToEventPage = () => {
  Linking.openURL('https://eventos.unicap.br/eventos/')
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const iconSize = 40;
  const iconColor = Colors.main.PrimaryColor;

  return (
    <View style={styles.container}>
      <HeaderLogo/>

      <View style={styles.grid}>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('profile')}>
          <FontAwesome name="user" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToEventPage}>
          <MaterialIcons name="event-note" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('exStudent')}>
          <FontAwesome5 name="user-graduate" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Ex Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('denunciation')}>
          <MaterialIcons name="error-outline" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Denuncias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('settings')}>
          <MaterialIcons name="settings" size={iconSize} color={iconColor} />
          <Text style={styles.buttonText}>Outros</Text>
        </TouchableOpacity>
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
    paddingTop: 30
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
  },
  buttonText: {
    fontSize: 16,
    color: '#8c1a1a',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
