import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Doctor from './pages/Doctor'
import Patient from './pages/Patient'
import Search from './pages/Search'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{labelPosition:'beside-icon'}}>
        <Tab.Screen
        options={{
            title: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginHorizontal: 20 }}>
                    <Fontisto name={'doctor'} size={33} color={ focused ? '#309D9E' : "gray"} />
                </View>
            ) 

        }}
        name="Doctor" component={Doctor} />
        <Tab.Screen
        options={{
            title: ({ focused }) => (
                <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                    <MaterialCommunityIcons name={'text-box-search-outline'} size={33} color={ focused ? '#309D9E' : "gray"} />
                </View>
            )

        }}
        name="Search" component={Search} />
        <Tab.Screen
        options={{
            title: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginHorizontal: 20 }}>
                   <FontAwesome5 name={'user-edit'} size={30} color={ focused ? '#309D9E' : "gray"} />
                </View>
            )

        }}
        name="Patient"  component={Patient} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}