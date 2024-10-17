import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';

export default function index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
      <Redirect href="/(home)" />
    </View>
  );
}