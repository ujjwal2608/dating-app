import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';

import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  BounceIn,
  Easing,
  FadeIn,
} from 'react-native-reanimated';

import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

interface OnboardingDataInterface {
  id: number;
  text: string;
  backgroundColor: string;
  textColor: string;
  image: any;
}

type Props = {
  index: number;
  x: SharedValue<number>;
  item: OnboardingDataInterface;
};

const RenderItem = ({ index, x, item }: Props) => {
  const router = useRouter();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0.5, 1, 1],
      Extrapolation.CLAMP
    );
    const translateYAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [200, 0, -200],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: translateYAnimation }, { scale }],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [1, 4, 4],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              borderRadius: SCREEN_WIDTH / 2,
              backgroundColor: item.backgroundColor,
            },
            circleAnimation,
          ]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        <LottieView
          source={item.image}
          style={{
            width: SCREEN_WIDTH / 1.3,
            height: SCREEN_WIDTH / 1.3,
            margin: 'auto',
          }}
          autoPlay
          loop
        />

        <Text style={[styles.itemText, { color: item.textColor, zIndex: 2 }]}>{item.text}</Text>
        {index === 2 && (
          <Animated.View
            entering={BounceIn}
            style={{
              paddingVertical: 10,
              width: 200,
              backgroundColor: 'blue',
              borderRadius: 50,
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Text
              style={{ color: 'white', fontSize: 20 }}
              onPress={() => router.push('/(auth)/login')}>
              Get Started
            </Text>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  getStartedButton: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: 'green',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
