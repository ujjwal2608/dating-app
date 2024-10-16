import { StatusBar } from 'expo-status-bar';
import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <>
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
    </Stack>
    <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}
