import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.main.SecondaryColor,
        tabBarInactiveTintColor: Colors.light.Primary,
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: true, 
        headerStyle: { backgroundColor: Colors.main.PrimaryColor },
        headerTitleStyle: { color: Colors.light.Primary },
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title:'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="denunciation"
        options={{
          title:'Denuncias',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="error-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title:'Notificaçoes',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event-note" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exStudent"
        options={{
          title:'Graduados',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-graduate" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title:'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.main.PrimaryColor,
    position: 'absolute', 
    bottom: 16,
    left: 16,
    right: 16,
    elevation: 4,
    borderRadius: 30,
    height: 60, 
    paddingBottom: 10,
  },
});
