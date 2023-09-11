import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FullCategory from './src/views/FullCategoryView';
import HomeView from './src/views/HomeView';
import ImageDisplay from './src/views/ImageDisplay';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationEnabled: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{
            headerShown: false, // This is true by default
          }}
        />
        <Stack.Screen
          component={FullCategory}
          name="FullCategory"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ImageDisplay}
          name="ImageDisplay"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
