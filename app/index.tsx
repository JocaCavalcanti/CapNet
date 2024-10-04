import { View,  Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import Colors from '../constants/Colors'
export default function Index() {
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
