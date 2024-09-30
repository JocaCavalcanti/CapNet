import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="event" />
      <Tabs.Screen name="exStudent" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
