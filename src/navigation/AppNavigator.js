import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";

import CalendarioScreen from "../screens/CalendarioScreen";
import HomeScreen from "../screens/HomeScreen";
import MinutaScreen from "../screens/MinutaScreen";
import PaseListaScreen from "../screens/PaseListaScreen";
import PlanTrabajoScreen from "../screens/PlanTrabajoScreen";

import PerfilScreen from "../screens/PerfilScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        {!user ? (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
            />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />

            <Stack.Screen
              name="RecoverPassword"
              component={RecoverPasswordScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              name="PlanTrabajo"
              component={PlanTrabajoScreen}
            />

            <Stack.Screen
              name="Calendario"
              component={CalendarioScreen}
            />

            <Stack.Screen
              name="Minuta"
              component={MinutaScreen}
            />

            <Stack.Screen
              name="PaseLista"
              component={PaseListaScreen}
            />

            {/* PERFIL */}
            <Stack.Screen
              name="Perfil"
              component={PerfilScreen}
            />

          </>
        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}