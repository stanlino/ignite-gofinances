import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MaterialIcons } from '@expo/vector-icons'

import { Dashboard } from '../screens/Dashboard'
import { Register } from '../screens/Register'
import { useTheme } from 'styled-components'
import { Resume } from '../screens/Resume'
import { Platform } from 'react-native'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {

    const { colors } = useTheme()

    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.secundary,
                tabBarInactiveTintColor: colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 60
                }
            }}
            
        >
            
            <Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons  
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="Register"
                component={Register}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons  
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="Resume"
                component={Resume}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons  
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

        </Navigator>
    )
}