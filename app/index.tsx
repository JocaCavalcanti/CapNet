import { View, Text, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/(tabs)/home"); 
  };

  return (
    <View>
      <Text>Index</Text>
      <Button title="Ir para Tabs" onPress={handleNavigate} />
    </View>
  );
}
