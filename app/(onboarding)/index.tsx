import { View, Text, useWindowDimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimationObject } from 'lottie-react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import OnboardingCard from '~/components/onboardingCard';
interface OnboardingDataInterface {
  id: number;
  text: string;
  backgroundColor: string;
  textColor: string;
  image: AnimationObject;
}
const onboardingData: OnboardingDataInterface[] = [
  {
    id: 1,
    text: 'find your life partner',
    backgroundColor: 'red',
    textColor: 'white',
    image: require('../../assets/love.json'),
  },
  {
    id: 2,
    text: 'AI algorithm will find your match',
    backgroundColor: 'blue',
    textColor: 'white',
    image: require('../../assets/ai.json'),
  },
  {
    id: 3,
    text: 'find your near ones',
    backgroundColor: 'green',
    textColor: 'white',
    image: require('../../assets/location.json'),
  },
];
const onboarding = () => {
  const {width: SCREEN_WIDTH,height:SCREEN_HEIGHT} = useWindowDimensions();
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <SafeAreaView>
      <View >
        <Animated.FlatList
          data={onboardingData}
          onScroll={onScroll}
          snapToAlignment="start"
          snapToInterval={SCREEN_WIDTH}
          decelerationRate="fast"
          horizontal={true}
          renderItem={({ item, index }) => {
            return <OnboardingCard item={item} index={index} x={x} />;
          }}
          showsHorizontalScrollIndicator={false}

        />
      </View>
    </SafeAreaView>
  );
};

export default onboarding;
