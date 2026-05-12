// AppNavigator.js

import React, { useContext } from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";

// 🔵 AUTH
import LoginScreen from "../screens/LoginScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";

// 🔵 HOME
import HomeScreen from "../screens/HomeScreen";

// 🔵 NUEVA PANTALLA
import NotificacionesScreen from "../screens/NotificacionesScreen";

// 🔵 OTRAS PANTALLAS
import AsistenciaAdminScreen from "../screens/AsistenciaAdminScreen";
import CalendarioScreen from "../screens/CalendarioScreen";
import DocentesScreen from "../screens/DocentesScreen";
import MinutaScreen from "../screens/MinutaScreen";
import PaseListaScreen from "../screens/PaseListaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import PlanTrabajoScreen from "../screens/PlanTrabajoScreen";
import ReportesScreen from "../screens/ReportesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  const { user, loading } =
    useContext(AuthContext);

  // 🔵 SPLASH
  if (loading) {
    return <SplashScreen />;
  }

  return (

    <NavigationContainer>

      <Stack.Navigator

        initialRouteName="Login"

        screenOptions={{

          headerShown: false,

          animation: "slide_from_right",

        }}
      >

        {!user ? (

          <>
            {/* 🔵 LOGIN */}
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            {/* 🔵 REGISTRO */}
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />

            {/* 🔵 RECUPERAR */}
            <Stack.Screen
              name="RecoverPassword"
              component={
                RecoverPasswordScreen
              }
            />
          </>

        ) : (

          <>
            {/* 🔵 HOME */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />

            {/* 🔔 NOTIFICACIONES */}
            <Stack.Screen
              name="Notificaciones"
              component={
                NotificacionesScreen
              }
            />

            {/* 🔵 PERFIL */}
            <Stack.Screen
              name="Perfil"
              component={PerfilScreen}
            />

            {/* 🔵 CALENDARIO */}
            <Stack.Screen
              name="Calendario"
              component={
                CalendarioScreen
              }
            />

            {/* 🔵 PLAN DE TRABAJO */}
            <Stack.Screen
              name="PlanTrabajo"
              component={
                PlanTrabajoScreen
              }
            />

            {/* 🔵 REPORTES */}
            <Stack.Screen
              name="Reportes"
              component={ReportesScreen}
            />

            {/* 🔵 MINUTAS */}
            <Stack.Screen
              name="Minuta"
              component={MinutaScreen}
            />

            {/* 🔵 DOCENTES */}
            <Stack.Screen
              name="Docentes"
              component={DocentesScreen}
            />

            {/* 🔵 PASE DE LISTA */}
            <Stack.Screen
              name="PaseLista"
              component={
                PaseListaScreen
              }
            />

            {/* 🔵 ASISTENCIA ADMIN */}
            <Stack.Screen
              name="AsistenciaAdminScreen"
              component={
                AsistenciaAdminScreen
              }
            />
          </>
        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}