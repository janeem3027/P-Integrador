import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

// Auth screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";
import ConfirmTokenScreen from "../screens/ConfirmTokenScreen";
import SplashScreen from "../screens/SplashScreen";

// App screens
import HomeScreen from "../screens/HomeScreen";
import NotificacionesScreen from "../screens/NotificacionesScreen";
import PerfilScreen from "../screens/PerfilScreen";
import CalendarioScreen from "../screens/CalendarioScreen";
import PlanTrabajoScreen from "../screens/PlanTrabajoScreen";
import ReportesScreen from "../screens/ReportesScreen";
import MinutaScreen from "../screens/MinutaScreen";
import DocentesScreen from "../screens/DocentesScreen";
import PaseListaScreen from "../screens/PaseListaScreen";
import AsistenciaAdminScreen from "../screens/AsistenciaAdminScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  // Pantalla de carga
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {/* 🔐 AUTH STACK */}
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
            <Stack.Screen name="ConfirmTokenScreen" component={ConfirmTokenScreen} />
          </>
        ) : (
          /* 📱 APP STACK */
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Calendario" component={CalendarioScreen} />
            <Stack.Screen name="PlanTrabajo" component={PlanTrabajoScreen} />
            <Stack.Screen name="Reportes" component={ReportesScreen} />
            <Stack.Screen name="Minuta" component={MinutaScreen} />
            <Stack.Screen name="Docentes" component={DocentesScreen} />
            <Stack.Screen name="PaseLista" component={PaseListaScreen} />
            <Stack.Screen name="AsistenciaAdminScreen" component={AsistenciaAdminScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}