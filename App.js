import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Screen1 from './Screen.js/Scr1';
import Screen2 from './Screen.js/Scr2';
import Screen3 from './Screen.js/Scr3';

export default function App() {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='Screen1' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Screen1'component={Screen1}/>
        <Stack.Screen name='Screen2' component={Screen2}/>
        <Stack.Screen name='Screen3' component={Screen3}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});