import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image
}
    from 'react-native';
import NewsPost from '../components/news';
import SliderComponent from '../components/sliderComponent';
import { useDrawerProgress } from '@react-navigation/drawer'

const HomeScreen = () => {
    // const status = useDrawerProgress();
    // useEffect(() => {

    //     console.log(status)
    // }, [status])
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.slider}>
                    <SliderComponent />
                </View>
                <View style={styles.news}>
                    <ScrollView>
                        <Text>News @ Impact</Text>
                        <NewsPost
                            imageUrl={'https://cdn.pixabay.com/photo/2023/05/14/19/42/sky-7993656_1280.jpg'}
                            text={'tetsskdf hdsjkfsdkjfhksdf kdshf'}
                            likesCount={150}
                            commentsCount={200} />

                        <NewsPost
                            imageUrl={'https://cdn.pixabay.com/photo/2023/05/14/19/42/sky-7993656_1280.jpg'}
                            text={'tetsskdf hdsjkfsdkjfhksdf kdshf'}
                            likesCount={150}
                            commentsCount={200} />
                        <NewsPost
                            imageUrl={'https://cdn.pixabay.com/photo/2023/05/14/19/42/sky-7993656_1280.jpg'}
                            text={'tetsskdf hdsjkfsdkjfhksdf kdshf'}
                            likesCount={150}
                            commentsCount={200} />
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5
    },
    slider:
    {
        flex: 0.3,
        width: "100%",
        alignItems: 'center'
    },
    news: {

    }
});
export default HomeScreen;