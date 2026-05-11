import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

// 🔵 SCREENS
import LoginScreen from "../screens/LoginScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";

import AsistenciaAdminScreen from "../screens/AsistenciaAdminScreen";
import CalendarioScreen from "../screens/CalendarioScreen";
import HomeScreen from "../screens/HomeScreen";
import MinutaScreen from "../screens/MinutaScreen";
import PaseListaScreen from "../screens/PaseListaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import PlanTrabajoScreen from "../screens/PlanTrabajoScreen";
import ReportesScreen from "../screens/ReportesScreen"; // ✅ NUEVO

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

        {/* 🔵 SI NO HAY USUARIO */}
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

          /* 🔵 USUARIO LOGUEADO */
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

            <Stack.Screen
              name="AsistenciaAdminScreen"
              component={AsistenciaAdminScreen}
            />

            <Stack.Screen
              name="Perfil"
              component={PerfilScreen}
            />

            {/* 🔵 NUEVO: REPORTES */}
            <Stack.Screen
              name="Reportes"
              component={ReportesScreen}
            />

          </>

        )}

      </Stack.Navigator>

    </NavigationContainer>

  );
}