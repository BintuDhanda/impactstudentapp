import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const Loading = ({
  visible = false,
  height = 200,
  size = 24,
}: {
  visible: boolean,
  height?: string | number,
  size?: number,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <View
      style={{
        width: '100%',
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={size} color={Colors.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
