import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import HeaderLogo from '@/components/headerLogo';

export default function Profile() {
  return (
    <View style={styles.container}>
      <HeaderLogo/>

      <ImageBackground
        source={require('../../assets/images/image18.webp')}
        style={styles.backgroundImage}
      >
      </ImageBackground>

      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: '../../assets/images/user4.webp' }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.name}>Cauã Coutinho</Text>
        <Text style={styles.course}>Sistemas Para Internet</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>RA:</Text>
          <Text style={styles.value}>00049394023</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>caua.20020@unicap.br</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.Trr,
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: Colors.main.PrimaryColor,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
    height:'20%',
    marginTop: -50,
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    top: -50,
    backgroundColor: '#F3F3F3',
    padding: 5,
    borderRadius: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 60,
  },
  course: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  infoContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});
