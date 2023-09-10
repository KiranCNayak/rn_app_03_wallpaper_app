import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeView from './src/views/HomeView';

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
            headerShown: true, // This is true by default as well
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
