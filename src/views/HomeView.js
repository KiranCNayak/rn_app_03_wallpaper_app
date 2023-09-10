import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React from 'react';

import Carousel from 'react-native-snap-carousel';

const HomeView = () => {
  return (
    <SafeAreaView style={styles.rootContainerStyle}>
      <Text style={styles.textStyle}>Home View</Text>
    </SafeAreaView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  rootContainerStyle: {
    backgroundColor: '#dddddd',
  },
  textStyle: {
    color: '#222222',
  },
});
