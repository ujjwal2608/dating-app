import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface PersonInterface {
  id: number;
  name: string;
  interest: string[];
  description: string;
  age: number;
  image: string;
}

const SWIPE_THRESHOLD = 120; // Threshold to detect swipe direction

const StackCard = ({
  item,
  onSwipeLeft,
  onSwipeRight,
}: {
  item: PersonInterface;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  // Shared values for translation and rotation
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const prevX = useSharedValue(0);
  const prevY = useSharedValue(0);
  const rotateZ = useSharedValue(-5 + Math.random() * 10); // initial random rotation
const scale = useSharedValue(1)
  const drag = Gesture.Pan()
    .onStart(() => {
      prevX.value = x.value;
      prevY.value = y.value;
    })
    .onUpdate((e) => {
        scale.value = 1.1
        rotateZ.value = 0
      x.value = prevX.value + e.translationX;
      y.value = prevY.value + e.translationY;
    })
    .onEnd((e) => {
      // Detect swipe direction
      if (x.value < -SWIPE_THRESHOLD) {
        // Left swipe
        runOnJS(onSwipeLeft)(); // Trigger left swipe callback
        x.value = withTiming(-SCREEN_WIDTH); // Animate card off to the left
      } else if (x.value > SWIPE_THRESHOLD) {
        // Right swipe
        runOnJS(onSwipeRight)(); // Trigger right swipe callback
        x.value = withTiming(SCREEN_WIDTH); // Animate card off to the right
      } else {
        // Snap back if no significant swipe
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
    });

  // Animated styles for translation and rotation
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
        {scale:scale.value},
      { perspective: 1500 },
      { translateX: x.value },
      { translateY: y.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={drag}>
        <Animated.View
          style={[
            {
              height: SCREEN_HEIGHT * 0.6,
              width: SCREEN_WIDTH * 0.8,
              position: 'absolute',
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
              marginTop: -50 * item.id,
              borderColor: 'black',
              borderWidth: 2,
            },
            animatedStyle,
          ]}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.interests}>Interests: {item.interest.join(', ')}</Text>
          <Text style={styles.age}>Age: {item.age}</Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default StackCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
  interests: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
  },
  age: {
    marginTop: 10,
    fontSize: 16,
  },
});
