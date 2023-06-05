import React from 'react';
import { View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

const SliderComponent = () => {
  const images = [
    require('../assets/impact-logo.jpg'),
    require('../assets/impact.png'),
    require('../assets/impact.png'),
  ];

  return (
    <View style={{ flex: 1 }}>
      <SliderBox
        images={images}
        autoplay={true}
        autoplayInterval={2000}
        circleLoop={true}
        resizeMode="contain"
        imageLoadingColor="#2196F3"
        dotColor="red"
        dotStyle={{height:20,width:20,borderRadius: 50}}
        inactiveDotColor="black"
        onCurrentImagePressed={(index)=> alert(index+1)}
        firstItem={4}
        paginationBoxVerticalPadding={10}
      />
    </View>
  );
};

export default SliderComponent;
