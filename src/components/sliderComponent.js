import React, {useEffect, useState} from 'react';
import {ImageBackground, View} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {Get as httpGet} from '../constants/httpService';
import {News_URL} from '../constants/constant';
import Loading from './loader';

const SliderComponent = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([]);
    // Make a network request to fetch image paths from your API
    httpGet('Slider/get')
      .then(response => {
        // Assuming your API response is an array of image paths
        const imagePaths = response.data;

        // Update the state with the fetched image paths
        setImages(imagePaths);
        console.log(imagePaths, 'imagePaths');
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={require('../assets/impact.png')}>
        <View style={{backgroundColor: '#fffffff0'}}>
          <Loading visible={images?.length == 0} />
          <SliderBox
            images={images.map(path => ({uri: News_URL + path.sliderImage}))}
            autoplay={true}
            autoplayInterval={2000}
            circleLoop={true}
            resizeMode="contain"
            imageLoadingColor="#2196F3"
            dotColor="red"
            dotStyle={{height: 10, width: 10, borderRadius: 50}}
            inactiveDotColor="black"
            firstItem={4}
            paginationBoxVerticalPadding={10}
            imageLoader
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SliderComponent;
