import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const providers = [
    {
      name: 'Google',
      icon: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000',
      onClick: () => Alert.alert('Google Sign-In Clicked'),
    },
    {
      name: 'LinkedIn',
      icon: 'https://img.icons8.com/?size=100&id=13930&format=png&color=000000',
      onClick: () => Alert.alert('LinkedIn Sign-In Clicked'),
    },
    {
      name: 'Facebook',
      icon: 'https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000',
      onClick: () => Alert.alert('Facebook Sign-In Clicked'),
    },
  ];

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleLogin = () => {
    Alert.alert('Login Attempted', `Email: ${form.email}\nPassword: ${form.password}`);
    router.push('/(home)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 justify-center px-4">
        <Text className="mb-5 text-center text-3xl font-bold">Create an account</Text>
        <Text className="mb-8 text-center text-gray-600">
          Already have an account? <Text className="font-semibold text-indigo-600">Login</Text>
        </Text>

        <View className="mb-4">
          <TextInput
            className="rounded-lg bg-gray-100 p-4"
            placeholder="Email address"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
          />
        </View>

        <View className="relative mb-2">
          <TextInput
            className="rounded-lg bg-gray-100 p-4 pr-12"
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <Text className="mb-6 text-right text-gray-500">Forgot Password</Text>

        <TouchableOpacity
          className="mb-6 items-center rounded-lg bg-indigo-500 p-4"
          onPress={handleLogin}>
          <Text className="text-lg font-semibold text-white">Continue</Text>
        </TouchableOpacity>

        <View className="mb-6 flex-row items-center">
          <View className="h-px flex-1 bg-gray-300" />
          <Text className="mx-4 text-gray-500">or sign up with</Text>
          <View className="h-px flex-1 bg-gray-300" />
        </View>

        <View className="mb-6 flex-row justify-between">
          {providers.map((provider) => (
            <TouchableOpacity
              key={provider.name}
              className="mx-2 flex-1 items-center rounded-lg bg-gray-100 p-4"
              onPress={provider.onClick}>
              <Image source={{ uri: provider.icon }} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-center text-sm text-gray-500">
          By clicking Create account, you agree to Dating App{' '}
          <Text className="text-indigo-600">Terms of Use</Text> and{' '}
          <Text className="text-indigo-600">Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default login;
