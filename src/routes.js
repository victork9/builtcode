import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Doctor from './Doctor'
import Patient from './Patient';
import Search from './Search';


const Tab = createBottomTabNavigator();


export default function Tabnavigation() {


    return (
        <Tab.Navigator

            initialRouteName='Doctor'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Doctor') {
                        iconName = focused ? 'md-home' : 'md-home';
                        return <Ionicons name={iconName} size={30} color={color} />;
                    } else if (route.name === 'Patient') {
                        iconName = focused
                            ? 'ios-list'
                            : 'ios-list';
                        return <Ionicons name={iconName} size={30} color={color} />;
                    }else if (route.name === 'Search') {
                        iconName = focused
                            ? 'ios-list'
                            : 'ios-list';
                        return <Ionicons name={iconName} size={30} color={color} />;
                    }

                },

            })}
            tabBarOptions={{

                activeTintColor: '#14733a',
                inactiveTintColor: 'gray',
                labelPosition: 'beside-icon',
                style: {
                    backgroundColor: '#fff',
                    position: 'absolute', bottom: 0,
                }
            }}
        >

            <Tab.Screen name="Doctor" options={{
                title: ({ focused }) => (
                    <View style={{ alignItems: 'flex-end', marginLeft: 20 }}>
                        <Text style={{ color: focused ? '#14733a' : "gray", }}>

                        </Text>
                    </View>
                )

            }} component={Doctor} nameroute={"Doctor"} />
            <Tab.Screen name="Patient" options={{
                title: ({ focused }) => (
                    <View style={{ alignItems: 'flex-end', marginLeft: 20 }}>
                        <Text style={{ color: focused ? '#14733a' : "gray", }}>

                        </Text>
                    </View>
                )
            }} component={Patient} />

            <Tab.Screen name="Search" options={{
                title: ({ focused }) => (
                    <View style={{ alignItems: 'flex-end', marginLeft: 20 }}>
                        <Text style={{ color: focused ? '#14733a' : "gray", }}>

                        </Text>
                    </View>
                )
            }} component={Search} />
        </Tab.Navigator>


    );
}