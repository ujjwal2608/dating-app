import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';


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
  //const rotateZ = useSharedValue(-5 + Math.random() * 10); // initial random rotation
  const rotateZ = useSharedValue(0); // initial random rotation
  const scale = useSharedValue(1);
  const prevRotateZ = useSharedValue(0);
  const drag = Gesture.Pan()
    .onStart(() => {
      prevX.value = x.value;
      prevY.value = y.value;
      prevRotateZ.value = rotateZ.value;
    })
    .onUpdate((e) => {
      scale.value = 0.8;
      rotateZ.value = 0;
      x.value = prevX.value + e.translationX;
      y.value = prevY.value + e.translationY;
    })
    .onEnd((e) => {
      // Detect swipe direction
      if (x.value < -SWIPE_THRESHOLD) {
        // Left swipe
        runOnJS(onSwipeLeft)(); // Trigger left swipe callback
        x.value = withTiming(-SCREEN_WIDTH*2); // Animate card off to the left
      } else if (x.value > SWIPE_THRESHOLD) {
        // Right swipe
        runOnJS(onSwipeRight)(); // Trigger right swipe callback
        x.value = withTiming(SCREEN_WIDTH*2); // Animate card off to the right
      } else {
        // Snap back if no significant swipe
        rotateZ.value = withSpring(prevRotateZ.value);
        x.value = withSpring(0);
        y.value = withSpring(0);
        scale.value = withSpring(1);
      }
    });

  // Animated styles for translation and rotation
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { perspective: 1500 },
      { translateX: x.value },
      { translateY: y.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
  }));

  return (
    <GestureHandlerRootView style={{position:"absolute",top:"50%",left:"50%",transform:[{translateX:-SCREEN_WIDTH*0.9/2+10*item.id},{translateY:-SCREEN_HEIGHT/2}]}}>
      <GestureDetector gesture={drag}>
        <Animated.View
          style={[
            {
              height: SCREEN_HEIGHT*0.7,
              width: (SCREEN_WIDTH*0.9)-item.id*20,
             position:"absolute",
             borderRadius:20,
             overflow:"hidden",
              backgroundColor: 'transparent',      
              borderColor:"rgb(139,104,125)",
              borderWidth:2,
              marginTop:20*item.id,
              
            },
            animatedStyle,
          ]}>
          <ImageBackground
            source={{ uri: item.image }} // Set the image as the background
            resizeMode="cover" // Adjust how the image fits the card
            style={{ flex: 1, padding: 20,    borderColor:"rgb(139,104,125)",
                borderWidth:2}} // Full size of the card
          >
             </ImageBackground>
            <BlurView intensity={60} style={{ height:"30%",padding:20,backgroundColor:"transparent" }}>
                
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={{ width: SCREEN_WIDTH*0.9, flexWrap: 'wrap', flexDirection: 'row' }}>
                {item.interest.map((interest, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'rgba(128, 128, 128, 0.3)',
                      alignItems: 'center',
                      justifyContent: 'center',          
                      borderRadius: 50,
                      marginHorizontal: 4,
                      marginVertical: 2,
                    }}>
                    <Text style={styles.interests}>{interest}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.age}>Age: {item.age}</Text>
            </BlurView>
         
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
    color: 'white',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
  interests: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'white',
    paddingHorizontal:20,
    paddingVertical:6
  },
  age: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
    marginBottom:10
  },
});
