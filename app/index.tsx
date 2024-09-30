import { View,  Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';

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
      }}
    >
      <Image
        source={require('../assets/images/logoScreen.png')}
        style={{
          width: '100%',
          height: 300,
        }}
      />
      <Button mode="contained" onPress={handleNavigate}>
    Press me
  </Button>
    </View>
  );
}
