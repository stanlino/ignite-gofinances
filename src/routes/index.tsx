import React from 'react'
 
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { useAuth } from '../hooks/auth'
import { AuthRoutes } from './auth.routes'
import AppLoading from 'expo-app-loading'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export function Routes() {

    const { user, userStorageLoading } = useAuth()

    if ( userStorageLoading ) {
        return <AppLoading />
    }

    return (
        <NavigationContainer>
            <SafeAreaProvider>
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </SafeAreaProvider>
        </NavigationContainer>
    )
}