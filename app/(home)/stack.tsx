import {  StyleSheet, useWindowDimensions, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { Keyframe, useAnimatedStyle,Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import StackCard from '~/components/StackCard';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
interface PersonInterface {
  id: number;
  name: string;
  interest: string[];
  description: string;
  age: number;
  image: string;
}

const Stack = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const onSwipeLeft = (person: PersonInterface) => {
    console.log(`${person.name} was swiped left!`);
  };

  const onSwipeRight = (person: PersonInterface) => {
    console.log(`${person.name} was swiped right!`);
  };
  const person: PersonInterface[] = [
    {
      id: 1,
      name: 'Aman',
      interest: ['coding', 'drawing', 'foodie'],
      description:
        'Finance and economics enthusiast. Interested in coding and technology. Loves exploring new food spots.',
      age: 21,
      image:
        'https://finetechhub.com/wp-content/uploads/2024/07/Beautiful-sofa-instagram-dp-boy-1024x1024.jpg.webp',
    },
    {
      id: 2,
      name: 'Sara',
      interest: ['traveling', 'photography', 'yoga'],
      description: 'A travel lover and photographer, enjoys capturing nature and practicing yoga.',
      age: 28,
      image: 'https://randomuser.me/api/portraits/women/21.jpg',
    },
    {
      id: 3,
      name: 'John',
      interest: ['basketball', 'gaming', 'technology'],
      description: 'A tech geek who loves playing basketball and is an avid gamer.',
      age: 25,
      image: 'https://randomuser.me/api/portraits/men/31.jpg',
    },
    {
      id: 4,
      name: 'Lily',
      interest: ['writing', 'reading', 'hiking'],
      description: 'Writer, reader, and hiker. Enjoys writing novels and reading mystery books.',
      age: 23,
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
      id: 5,
      name: 'Mike',
      interest: ['music', 'concerts', 'cycling'],
      description: 'Music lover, attends live concerts frequently, and loves outdoor cycling.',
      age: 30,
      image: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
    {
      id: 6,
      name: 'Emma',
      interest: ['fashion', 'blogging', 'design'],
      description: 'A fashion enthusiast who runs a blog and works as a freelance designer.',
      age: 27,
      image: 'https://randomuser.me/api/portraits/women/75.jpg',
    },
    {
      id: 7,
      name: 'Daniel',
      interest: ['photography', 'cooking', 'coding'],
      description: 'Loves capturing moments, experimenting in the kitchen, and coding.',
      age: 26,
      image: 'https://randomuser.me/api/portraits/men/64.jpg',
    },
    {
      id: 8,
      name: 'Sophia',
      interest: ['dancing', 'fitness', 'art'],
      description: 'A professional dancer, fitness enthusiast, and an art lover.',
      age: 24,
      image: 'https://randomuser.me/api/portraits/women/18.jpg',
    },
    {
      id: 9,
      name: 'David',
      interest: ['sports', 'investing', 'traveling'],
      description: 'Sports fanatic, interested in investing, and enjoys exploring new countries.',
      age: 29,
      image: 'https://randomuser.me/api/portraits/men/84.jpg',
    },
    {
      id: 10,
      name: 'Olivia',
      interest: ['gardening', 'painting', 'music'],
      description: 'Loves painting, spends time in the garden, and enjoys listening to music.',
      age: 22,
      image: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
  ];
  const scale1 = useSharedValue(0.8); // Initial scale for first animated view
  const scale2 = useSharedValue(1); // Initial scale for second animated view
  const scale3 = useSharedValue(0.8); // Initial scale for third animated view

  // Function to trigger scale in and out animations
  const triggerAnimation = () => {
    scale1.value = withRepeat(withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }), -1, true);
    scale2.value = withRepeat(withTiming(0.9, { duration: 3000, easing: Easing.inOut(Easing.ease) }), -1, true);
    scale3.value = withRepeat(withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }), -1, true);
  };

  // Use useEffect to trigger the animation when the component mounts
  useEffect(() => {
    triggerAnimation();
  }, []);
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale1.value }],
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale2.value }],
    };
  });

  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale3.value }],
    };
  });

  return (
    <SafeAreaView
      style={{ flex: 1,alignItems:"center",justifyContent:"center",backgroundColor:"rgb(200,220,222)"}}>
    
      <Animated.View style={[animatedStyle1,{backgroundColor:"rgb(234,156,246)",zIndex:2,top:100,right:0,borderRadius:150,width:200,height:200,position:"absolute"}]}></Animated.View>
      <Animated.View style={[animatedStyle2,{backgroundColor:"rgb(143,203,249)",zIndex:3,top:600,left:-100,borderRadius:300,width:200,height:200,position:"absolute"}]}></Animated.View>   
      <Animated.View style={[animatedStyle3,{backgroundColor:"rgb(179,182,246)",top:200,right:10,borderRadius:350,width:500,height:500,position:"absolute"}]}></Animated.View>    
      <BlurView intensity={30} style={{zIndex:5,width:SCREEN_WIDTH,height:SCREEN_HEIGHT,position:"absolute",top:0,left:0,alignItems:"center",justifyContent:"center"}} >   
      <Animated.View
        style={{
          height: SCREEN_HEIGHT * 0.6,
          width: SCREEN_WIDTH * 0.8,
          zIndex:4
        }}>

        {person.reverse().map((item) => (
          <StackCard
            key={item.id}
            item={item}
            onSwipeLeft={() => onSwipeLeft(item)}
            onSwipeRight={() => onSwipeRight(item)}
          />
        ))}
      </Animated.View>
      </BlurView>
    </SafeAreaView>
  );
};

export default Stack;

const styles = StyleSheet.create({});
