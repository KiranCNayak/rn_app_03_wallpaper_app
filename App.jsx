import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CategoryView from './src/views/CategoryView/CategoryView';
import HomeView from './src/views/HomeView/HomeView';
import ImageDisplay from './src/views/ImageDisplay/ImageDisplay';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animationEnabled: false,
          gestureDirection: 'vertical',
          gestureEnabled: true,
        }}>
        <Stack.Screen
          component={HomeView}
          name="Home"
          options={{
            headerShown: false, // This is true by default
          }}
        />
        <Stack.Screen
          component={CategoryView}
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
