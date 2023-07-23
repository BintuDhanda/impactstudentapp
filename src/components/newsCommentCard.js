import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../App';
import { useContext } from 'react';

const NewsCommentCard = ({ item, ondelete, onEdit, showDelete, showModelVisible, recordEmpty }) => {
    const { user, setUser } = useContext(UserContext);
    const [cardComment, SetCardComment] = useState(item.item);

    const date = new Date(cardComment.createdAt);
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: Colors.background,
            borderRadius: 10,
            padding: 5,
            marginBottom: 10,
            shadowColor: Colors.primary,
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 5,
            shadowRadius: 10,
            elevation: 10,
            borderWidth: 1.5,
            borderColor: "grey",
            alignItems: 'center'
        }}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', borderRadius: 50, borderWidth: 1.5, borderColor: Colors.primary, color: Colors.secondary, padding: 8, marginRight: 10 }}>{cardComment.userName}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: '80%' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{cardComment.comment}</Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{date.toLocaleTimeString('en-US')}</Text>
            </View>
            {user.userId === cardComment.createdBy ?
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '20%' }}>

                    <TouchableOpacity style={{ marginRight: 10, }} onPress={() => { onEdit(cardComment.newsCommentId); recordEmpty([]); showModelVisible(true); }} >
                        <Icon name="pencil" size={18} color={'#5a67f2'} style={{ marginLeft: 8, textAlignVertical: 'center' }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { ondelete(cardComment.newsCommentId); showDelete(true); }}>
                        <Icon name="trash" size={18} color={'#f25252'} style={{ marginRight: 8, textAlignVertical: 'center' }} />
                    </TouchableOpacity>
                </View> : null}
        </View >
    );
};

export default NewsCommentCard;