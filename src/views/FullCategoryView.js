import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const FullCategory = props => {
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
        Full Category View
      </Text>
    </SafeAreaView>
  );
};

export default FullCategory;
