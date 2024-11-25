import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../constants/Colors';

const Slider = () => {
  const sliderData = [
    {
      image: require('../assets/images/images20.webp'), 
    },
    {
      image: require('../assets/images/images20.webp'),
    },
    {
      image: require('../assets/images/images20.webp'),
    },
  ];

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        loop={true} 
        autoplay={true} 
        showsButtons={true}
      >
        {sliderData.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginVertical: 20,
  },
  wrapper: {
    //TODO:
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.main.PrimaryColor,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Slider;
