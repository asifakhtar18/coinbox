import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn, SignUp, Welcome, OTPVerificationScreen } from "../screens/authScreens";

const Stack = createNativeStackNavigator();


const AuthNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}

        >
            <Stack.Screen
                name="welcome"
                component={Welcome}
            />
            <Stack.Screen
                name="signup"
                component={SignUp}
            />

            <Stack.Screen
                name="signin"
                component={SignIn}
            />
            <Stack.Screen
                name="verification"
                component={OTPVerificationScreen}
            />

        </Stack.Navigator>
    )
};

export default AuthNavigator