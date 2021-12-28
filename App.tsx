import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import "react-native-gesture-handler"
import { OnBoarding } from './app/screens/Index'


const Stack = createStackNavigator()

const App = () => {
  return ( 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name= "Onboarding"
          component = {OnBoarding}
          options= {{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer> 
  ) 
} 
 
export default () =>{
  return <App/>
} 

const styles = StyleSheet.create({})
