import { Dimensions, SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const dataList = [
  {
    src: 'https://imgs.search.brave.com/UCHK6cNPnjF2vMiIWZE7ddqFyI5S6vmFm6HMn4HBM9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTc1/NTE1NDc1L3Bob3Rv/L21vdW50YWlucy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZTBUeGRxcG1ReGdT/WW9IaUI2RjZ4LVNM/c0xiSWVXN3lNM3dl/U0JOeVo1VT0',
    title: 'mountain',
    id: 1,
  },
  {
    src: 'https://imgs.search.brave.com/vByylo72DipCEW5fZXHErMD5HGik8KtIwwd0QHiccT4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA0/NjcxNTE4NC9waG90/by9sdXNoLWdyZWVu/LWZvcmVzdC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TjJr/TUw5NFRfWDRXcGdH/U2JfWTg3RVd3bzly/dnJ0ckpEZ01mdFVk/NzdMUT0',
    title: 'forest',
    id: 2,
  },
  {
    src: 'https://imgs.search.brave.com/uFunMGFufMbFhYlvGofT2qvPp1OoTWIi1_hw_dSEN88/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/bGVhci1sYWtlLXdp/dGgtcmVmbGVjdGlv/bi10cmVlcy1za3kt/Y29vbC1kYXktc3By/aW5nXzE4MTYyNC00/OTkwNC5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw',
    title: 'lake',
    id: 3,
  },
  {
    src: 'https://imgs.search.brave.com/fp8fqHIaSxSIxyq1pVQ-5PNOhmysv5-YwU-T1i0TyNU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/ZWFjaC1zZWFfNzQx/OTAtNDUyNy5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw',
    title: 'beaches',
    id: 4,
  },
];

interface Data {
  src: string;
  title: string;
  id: number;
}

interface ImageComponentProps {
  data: Data;
  scrollX: Animated.SharedValue<number>;
  index: number;
}

const { width, height } = Dimensions.get('window');

const ImageComponent = ({ data, scrollX, index }: ImageComponentProps) => {
  console.log(scrollX.value);
  const animation = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width * 0.9, index * width * 0.9, (index + 1) * width * 0.9];
    console.log(inputRange);
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [-width * 0.9, 0, width * 0.9],
      Extrapolation.CLAMP
    );
    const scale = interpolate(scrollX.value, inputRange, [1, 1.5, 2], Extrapolation.CLAMP);
    return {
      transform: [{ translateX }, { scale }],
    };
  });

  return (
    <Animated.View style={{ width: width * 0.9, height: 250, overflow: 'hidden' }}>
      <Animated.Image
        source={{ uri: data.src }}
        style={[{ width: width * 0.9, height: 250, resizeMode: 'cover' }, animation]}
      />
    </Animated.View>
  );
};

const Index = () => {
  const scrollX = useSharedValue<number>(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const x = event.contentOffset.x;
    scrollX.value = x;
  });
  const interest = ['basketball', 'gaming', 'technology', 'traveling', 'photography', 'yoga'];
  return (
    <SafeAreaView style={{ flex: 1,position:"relative", backgroundColor: 'rgb(40,25,52)', alignItems: 'center' }}>
       
      <View
        style={{
          width: width * 0.9,
          height: 70,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{ color: 'white', fontSize: 34, fontWeight: 900 }}>TINDER</Text>
        <Image
          source={{
            uri: 'https://imgs.search.brave.com/UCHK6cNPnjF2vMiIWZE7ddqFyI5S6vmFm6HMn4HBM9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTc1/NTE1NDc1L3Bob3Rv/L21vdW50YWlucy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZTBUeGRxcG1ReGdT/WW9IaUI2RjZ4LVNM/c0xiSWVXN3lNM3dl/U0JOeVo1VT0',
          }}
          style={{
            borderRadius: 50,
            width: 60,
            height: 60,
            borderColor: 'rgb(148,134,148)',
            borderWidth: 2,
          }}
        />
      </View>
      <View style={{ alignItems: 'flex-start', width: width * 0.9, gap: 10, margin: 20 }}>
        <Text style={{ color: 'white', fontSize: 26, fontWeight: 700 }}>Aman Fangeria!</Text>
        <Text style={{ color: 'rgb(148,134,148)', fontSize: 16, fontWeight: 400 }}>
          Finance and economics enthusiast. Interested in coding and technology. Loves exploring new
          food spots.
        </Text>
      </View>
      <View
        style={{
          height: 250,
          width: width * 0.9,
          marginHorizontal: 'auto',
          overflow: 'hidden',
          borderRadius: 20,
          borderColor: 'rgb(148,134,148)',
          borderWidth: 2,
        }}>
        <Animated.FlatList
          data={dataList}
          renderItem={({ item, index }) => (
            <ImageComponent key={item.id} index={index} data={item} scrollX={scrollX} />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          pagingEnabled
          style={{}}
        />
      </View>
      <View style={{ width: width * 0.9, flexWrap: 'wrap', flexDirection: 'row',marginTop:20 }}>
        {interest.map((interest, index) => (
          <View
            key={index}
            style={{
              backgroundColor: 'rgba(128, 128, 128, 0.3)',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              marginHorizontal: 4,
              marginVertical: 4,
            }}>
            <Text style={styles.interests}>{interest}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  interests: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
});
