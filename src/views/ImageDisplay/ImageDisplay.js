import { Text, SafeAreaView } from 'react-native';
import React from 'react';

const ImageDisplay = props => {
  console.log(JSON.stringify(props, null, 2));
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ddd',
      }}>
      <Text
        style={{
          color: '#222',
        }}>
        Image Display View
      </Text>
    </SafeAreaView>
  );
};

export default ImageDisplay;
