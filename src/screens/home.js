import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    FlatList,
    Animated,
    ActivityIndicator,
}
    from 'react-native';
import NewsPost from '../components/news';
import SliderComponent from '../components/sliderComponent';
import Colors from '../constants/Colors';
import NewsCardComponent from '../components/newsCardComponent';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { Post as httpPost } from '../constants/httpService';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
    const { user, setUser } = useContext(UserContext);
    const ToDate = new Date();
    ToDate.setDate(ToDate.getDate() + 1)
    const FromDate = new Date();
    FromDate.setDate(FromDate.getDate() - 7);
    const moveToRight = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState(FromDate.toISOString().slice(0, 10).toString());
    const [toDate, setToDate] = useState(ToDate.toISOString().slice(0, 10).toString());
    const [take, setTake] = useState(10);
    const [skip, setSkip] = useState(0);
    const [newsTitle, setNewsTitle] = useState("");
    const [isEndReached, setIsEndReached] = useState(true);
    const [newsList, setNewsList] = useState([]);

    // useEffect(()=>{
    //     GetNewsList();
    // },[])
    useFocusEffect(
        React.useCallback(() => {
            GetNewsList();
        }, [])
    );

    const GetNewsList = () => {
        setLoading(true);
        const filter = {"Take": take, "Skip": skip, "CreatedBy": user.userId }
        httpPost("News/getAllNews", filter)
            .then((result) => {
                console.log(result.data, "news")
                setLoading(false);
                if (result.data.length >= 0) {
                    setIsEndReached(false);
                    setNewsList([...newsList, ...result.data])
                    setSkip(skip + 10)
                }
                if (result.data.length === 0) {
                    setIsEndReached(true);
                    Toast.show({
                        type: 'info',
                        text1: 'No records found',
                        position: 'bottom',
                        visibilityTime: 2000,
                        autoHide: true,
                    });
                }
            })
            .catch(err => console.error('Get News error :', err))
    }

    const handleLoadMore = async () => {
        console.log("Execute Handle More function")
        if (!isEndReached) {
            GetNewsList();
        }
    };

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, }}>
                <Animated.View style={{ flex: 1, position: 'absolute', top: 0, padding: 16, right: 0, left: 0, bottom: 0, backgroundColor: Colors.background, transform: [{ scale: scale }, { translateX: moveToRight }] }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <SliderComponent />
                    </View>
                    <Text style={{color: Colors.primary, fontSize: 20, fontWeight: "bold", marginTop:10, marginBottom:5}}>Latest News</Text>
                    <FlatList
                        data={newsList}
                        keyExtractor={(item) => item.newsId.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) => <NewsCardComponent item={item} navigation={navigation} />}
                        ListFooterComponent={renderFooter}
                        onEndReached={() => {
                            handleLoadMore();
                        }}
                        onEndReachedThreshold={0.1}
                    />
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </Animated.View>
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