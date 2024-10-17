import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { View, Text, Pressable, StyleSheet, LayoutChangeEvent, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useReducer, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import RenderItem from '~/components/onboardingCard';
export default function TabLayout() {
  return (
    <>
    
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ tabBarActiveTintColor: 'red', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color="white" />,
        }}
        />
      <Tabs.Screen
        name="stack"
        options={{
            title: 'Stack',
            tabBarIcon: ({ color }) => <AntDesign name="heart" size={20} color="white" />,
        }}
        />
      <Tabs.Screen
        name="profile"
        options={{
            title: 'profile',
            tabBarIcon: ({ color }) => <Octicons name="person" size={20} color="white" />,
        }}
        />
      <Tabs.Screen
        name="chat"
        options={{
            title: 'chat',
            tabBarIcon: ({ color }) => <Ionicons name="chatbox-outline" size={20} color="white" />,
        }}
        />
    </Tabs>
    <StatusBar backgroundColor="#161622" style="light" />

        </>
  );
}

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const reducer = (state: any, action: { x: number; index: number }) => {
    return [...state, { x: action.x, index: action.index }];
  };
  const [layout, dispatch] = useReducer(reducer, []);
  console.log(layout);
  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };
  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex)!.x;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  return (
    <View style={{ width:SCREEN_WIDTH,backgroundColor:"rgb(40,25,52)", margin: 'auto'}}>
     <View style={styles.tabBarContainer}>
      <BlurView intensity={5} style={{backgroundColor:"transparent",flex:1,  flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',}}>
      <Animated.View
        style={[
          {
            backgroundColor: 'rgb(245,63,127)',
            height: 30,
            width: 30,
            borderRadius: 100,
            position: 'absolute',
            left: 25,
            top: 40,
            zIndex: -1,
            shadowColor: 'rgb(245,63,127)', // Same color as the box with opacity
            
            shadowOpacity: 1,
            shadowRadius: 20, // Adjust the radius for larger shadow
            elevation: 12, 
          },
          animatedStyles,
        ]}></Animated.View>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];
          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onPress={() => navigation.navigate(route.name)}
              onLayout={(e) => handleLayout(e, index)}
            />
          );
        })}
      </BlurView>
      </View>
    </View>
  );
};

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
};

const TabBarComponent = ({ active, options, onPress, onLayout }: TabBarComponentProps) => {
  const ref = useRef(null);

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.pressable}>
      <Animated.View style={[styles.animatedView]} ref={ref}>
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
  
   
    borderRadius:200,
    width:350,
    height:50,
    margin:"auto",
    bottom:50,
    borderColor:"rgb(139,104,125)",
    borderWidth:2,
    overflow:"hidden"
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
  },
  animatedView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    width: 50,
   
  },
});
