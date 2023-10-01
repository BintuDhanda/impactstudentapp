import React,{useEffect,useState} from 'react';
import { View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Get as httpGet } from '../constants/httpService';
import { News_URL } from '../constants/constant';

  const SliderComponent = () => {
    const [images, setImages] = useState([]);
  
    useEffect(() => {
      // Make a network request to fetch image paths from your API
      httpGet('Slider/get')
        .then(response => {
          // Assuming your API response is an array of image paths
          const imagePaths = response.data;
  
          // Update the state with the fetched image paths
          setImages(imagePaths);
          console.log(imagePaths,"imagePaths");
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        });
    }, []);
  return (
    <View style={{ flex: 1 }}>
      <SliderBox
        images={images.map(path => ({ uri: News_URL+path.sliderImage }))}
        autoplay={true}
        autoplayInterval={2000}
        circleLoop={true}
        resizeMode="contain"
        imageLoadingColor="#2196F3"
        dotColor="red"
        dotStyle={{height:10,width:10,borderRadius: 50}}
        inactiveDotColor="black"
        firstItem={4}
        paginationBoxVerticalPadding={10}
      />
    </View>
  );
};

export default SliderComponent;
