import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="stack"
        options={{
          title: 'stack',
          tabBarIcon: ({ color }) => <AntDesign name="heart" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
